<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="icon" href="{{ asset('image/application-icon.png') }}" type="image/x-icon" />
<link rel="shortcut icon" href="{{ asset('image/application-favicon.png') }}" type="image/x-icon" />
<title>@yield('page_title')</title>
<script src="{{asset('js/jquery.min.js')}}"></script>
<script src="{{asset('js/bootstrap.min.js')}}"></script>
<script src="{{ asset('js/global_custom.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}"/>
@yield('scripts')
<link rel="stylesheet" href="{{ asset('css/font-awesome-all.min.css') }}" type="text/css">
<link rel="stylesheet" href="{{ asset('font/fonts.css') }}" type="text/css">
<link rel="stylesheet" href="{{ asset('css/global.css') }}" type="text/css" >