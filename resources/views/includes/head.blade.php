<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>@yield('page_title')</title>
<!-- <script src="{{ asset('js/jquery.min.js') }}"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" > -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
@yield('scripts')
<link rel="stylesheet" href="{{ asset('css/font-awesome-all.min.css') }}" type="text/css">
<link rel="stylesheet" href="{{ asset('font/fonts.css') }}" type="text/css">
<link rel="stylesheet" href="{{ URL::asset('css/global.css') }}" type="text/css" >