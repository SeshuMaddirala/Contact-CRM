<!doctype html>
<html>
<head>
   @include('includes.head')
</head>
<body>
<div class="container">
   <header class="row">
       @include('includes.header')
   </header>
   <div class="body-container nominifier">
        <div id="main" class="home">
            <!-- @yield('contact-content') -->
            @include('includes.body_container')
        </div>
    </div>
   <!-- <footer class="row">
       @include('includes.footer')
   </footer> -->
</div>
</body>
</html>