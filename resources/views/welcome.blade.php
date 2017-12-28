<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Streamy</title>
        <!-- CSRF Stuff -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/bootswatch-slate.min.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/animate.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ URL::asset('pubcss/font-awesome.min.css') }}">
        <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>
        <!-- Fonts -->
   </head>
   <body>
        <div class="container" id='app'>
            <article-list></article-list>
        </div>
        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>