import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Validate Auth (User must be logged in to access this function)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }

    // Client for Auth validation
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    )

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser()

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: authError?.message }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    // 2. Parse Request Body
    const { type } = await req.json()

    if (!type) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameter: type',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    // 3. Fetch Configuration from Database (Using Service Role to access private table)
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: config, error: configError } = await adminClient
      .from('spreadsheet_configs')
      .select('spreadsheet_id, sheet_name, range')
      .eq('type', type)
      .single()

    if (configError || !config) {
      console.error('Config fetch error:', configError)
      return new Response(
        JSON.stringify({
          error: `Configuration for type '${type}' not found`,
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    // 4. Get API Key from Secrets
    const apiKey = Deno.env.get('sheets')
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Server configuration error: Google Sheets API Key not found',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    // 5. Fetch Data from Google Sheets API
    // Construct range: Use config.range if available, otherwise default to SheetName (entire sheet)
    // If range is "A:Z", combined it becomes "SheetName!A:Z"
    const rangeParam = config.range
      ? `${config.sheet_name}!${config.range}`
      : config.sheet_name

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheet_id}/values/${encodeURIComponent(rangeParam)}?key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error:
            data.error?.message || 'Failed to fetch data from Google Sheets',
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    // 6. Return Data
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal Server Error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
