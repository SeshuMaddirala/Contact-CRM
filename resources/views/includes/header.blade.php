<!-- <nav class="navbar navbar-default navbar-fixed-top" >
    <div class="container"> -->
    <!-- <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand icon-a" href="#">
             <i class="fa-solid fa-handshake-angle"></i>CRM -->
            <!--  <span><img src="{{ asset('image/application-icon.png') }}" class="app-icon" alt="Linked Contact CRM" /><small>DASH CRM 
                @if(Session::has('login_through') && Session::get('login_through') == 'google')(Google)@endif
                @if(Session::has('login_through') && Session::get('login_through') == 'outlook')(Outlook)@endif
            </small></span>
        </a>
    </div> -->
    <div class="nav-header">
        <a href="index.html" class="brand-logo">
            <img class="logo-abbr" src="{{ asset('image/application-icon.png') }}" alt="Dash CRM">  <small>DASH CRM 
                @if(Session::has('login_through') && Session::get('login_through') == 'google')(Google)@endif
                @if(Session::has('login_through') && Session::get('login_through') == 'outlook')(Outlook)@endif
            </small>
        </a>
        <div class="nav-control">
            <div class="hamburger is-active">
                <span class="line"></span><span class="line"></span><span class="line"></span>
            </div>
        </div>
    </div>

    <div class="header">
        <div class="header-content">
            <nav class="navbar navbar-expand">
                <div class="collapse navbar-collapse justify-content-between">
                <div class="header-left"></div>
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
                    <li class="nav-item dropdown profile-div">
                        <a class="nav-link user-profile" data-toggle="dropdown" href="#">
                            <span> {{loggedUserData()['name']}} </span>
                            <i class="fa fa-user-circle"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="javascript:;;" class="dropdown-item app-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                        </div>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </div>

    <div class="quixnav">
        <div class="quixnav-scroll ps ps--active-y mm-active">
            <ul class="metismenu mm-show" id="menu">
                <li class="{{ Request::path() == 'index' ? 'active' : '' }}">
                    <a href="index" class="has-arrow" >
                        <i class="fa-fw fa-solid fa-house-chimney fa-2x" title="Dashboard"></i>
                        <span class="nav-text">Dashboard</span>
                    </a>
                </li>
                <li class="{{ Request::path() == 'contact' ? 'active' : '' }}">
                    <a href="contact" class="has-arrow" ><i class="fa-fw fa-solid fa-address-card fa-2x" title="Contacts"></i>
                    <span class="nav-text">Contacts</span></a>
                </li>
                <li class="{{ Request::path() == 'reminder' ? 'active' : '' }}">
                    <a href="reminder" class="has-arrow" ><i class="fa-fw far fa-bell" title="Reminders"></i><span class="nav-text">Reminders</span></a>
                </li>
                <li class="{{ Request::path() == 'activities' ? 'active' : '' }}">
                    <a href="activities" class="has-arrow" ><i class="fa-fw fa-solid fa-clipboard-list fa-2x" title="Activities"></i><span class="nav-text">Activities</span></a>
                </li>
            </ul>
        </div>
    </div>
    <!-- <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav menu-ul-li">
            <li class="{{ Request::path() == 'index' ? 'active' : '' }}"><a href="index"><i class="fa-fw fa-solid fa-house-chimney fa-2x" title="Dashboard"></i>Dashboard</a></li>
            <li class="{{ Request::path() == 'contact' ? 'active' : '' }}"><a href="contact"><i class="fa-fw fa-solid fa-address-card fa-2x" title="Contacts"></i>Contacts</a></li>
            <li class="{{ Request::path() == 'reminder' ? 'active' : '' }}"><a href="reminder"><i class="fa-fw far fa-bell" title="Reminders"></i>Reminders</a></li>
            <li class="{{ Request::path() == 'activities' ? 'active' : '' }}"><a href="activities"><i class="fa-fw fa-solid fa-clipboard-list fa-2x" title="Activities"></i>Activities</a></li>
             <li class="{{ Request::path() == 'settings' ? 'active' : '' }}">
                <a href="javascript:;;">
                    <i class="fa-fw fa-solid fa-gear fa-2x" title="Settings"></i>Settings
                </a>
                <ul class="seconday_ul">
                    <li><a href="column_list"><i class="fa-fw fa-solid fa-file-circle-plus fa-2x"></i>Column List</a></li>
                </ul>
            </li> -->
        <!--</ul>
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
            <li class="nav-item dropdown profile-div">
                <a class="nav-link user-profile" data-toggle="dropdown" href="#">
                    <span> {{loggedUserData()['name']}} </span>
                    <i class="fa fa-user-circle"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="javascript:;;" class="dropdown-item app-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                </div>
            </li>
        </ul>
    </div> -->
    <!-- </div>
</nav> -->