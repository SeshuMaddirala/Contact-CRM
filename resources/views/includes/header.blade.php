<nav class="navbar navbar-default navbar-fixed-top" >
    <div class="container">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand icon-a" href="#">
            <!-- <i class="fa-solid fa-handshake-angle"></i>CRM -->
            <img src="{{ asset('image/application-icon.png') }}" class="app-icon" alt="Linked Contact CRM" />
        </a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
            <li class="{{ Request::path() == 'index' ? 'active' : '' }}"><a href="index">Dashboard</a></li>
            <li class="{{ Request::path() == 'contact' ? 'active' : '' }}"><a href="contact">Contacts</a></li>
            <li class="{{ Request::path() == 'reminder' ? 'active' : '' }}"><a href="reminder">Reminders</a></li>
        </ul>
        <ul class="nav navbar-nav ml-auto float-right">
            <li class="nav-item dropdown reminder-section">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-bell"></i>
                    <span class="badge badge-warning navbar-badge"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span class="dropdown-item dropdown-header"></span>
                    <div class="dropdown-divider"></div>
                    <a href="reminder?type=contact" class="dropdown-item">
                        Contact Reminders
                        <span class="float-right text-muted text-sm cont-remin"></span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="reminder?type=date" class="dropdown-item">
                        Date Reminders
                        <span class="float-right text-muted text-sm date-remin"></span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="reminder?type=all" class="dropdown-item dropdown-footer">See All Reminders</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link user-profile" data-toggle="dropdown" href="#">
                    <span> {{loggedUserData()['name']}} </span>
                    <i class="fa fa-user-circle"></i>
                </a>
            </li>
        </ul>
    </div>
    </div>
</nav>