<nav class="sidebar-nav navbar navbar-default nav-left">
    <div class="container">
        <div class="header left-header navbar-header">
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
            <ul class="nav navbar-nav" id="primary">
                <li class="{{ Request::path() == 'index' ? 'active' : '' }}"><a href="index" style="display: flex;
    margin-left: -32px;
    /* background: aquamarine; */
    font-size: 20px;
    padding: 13px 14px;
    margin-top: 26px;"><i class="fa-fw fa-solid fa-house-chimney fa-2x" style="font-size:20px" title="Dashboard"></i><span>Dashboard</span></a></li>
                <li class="{{ Request::path() == 'contact' ? 'active' : '' }}"><a href="contact" style="display: flex;
    margin-left: -32px;
    /* background: aquamarine; */
    font-size: 20px;
    padding: 13px 14px;
    margin-top: 26px;"><i class="fa-fw fa-solid fa-address-book fa-2x" style="font-size:20px" title="contacts"></i><span>Contacts</span></a></li>
                <li class="{{ Request::path() == 'reminder' ? 'active' : '' }}"><a href="reminder" style="display: flex;
    margin-left: -32px;
    /* background: aquamarine; */
    font-size: 20px;
    padding: 13px 14px;
    margin-top: 26px;"><i class="fa-fw fa-solid fa-bell fa-2x" style="font-size:20px" title="remainders"></i><span>Remainders</span></a></li>
            </ul>
            <!-- <ul id="primary">
                <li><a class="active" href="index.php?m=home"><i class="fa-fw fa-solid fa-house-chimney fa-2x" title="Dashboard"></i><span>Dashboard</span></a>
                </li>
                <li><a class="inactive" href="index.php?m=joborders"><i class="fa-fw fa-solid fa-layer-group fa-2x" title="Job Orders"></i><span>Job Orders</span></a></li>
                <li><a class="inactive" href="index.php?m=candidates"><i class="fa-fw fa-solid fa-users fa-2x" title="Candidates"></i><span>Candidates</span></a></li>
                <li><a class="inactive" href="index.php?m=lists"><i class="fa-fw fa-solid fa-list fa-2x" title="Lists"></i><span>Lists</span></a></li>
                <li><a class="inactive" href="index.php?m=calendar"><i class="fa-fw fa-solid fa-calendar-days fa-2x" title="Calendar*al=100@calendar"></i><span>Calendar</span></a></li>
                <li><a class="inactive" href="index.php?m=activity"><i class="fa-fw fa-solid fa-clipboard-list fa-2x" title="Activities"></i><span>Activities</span></a></li>
                <li><a class="inactive" href="index.php?m=settings&amp;a=administration"><i class="fa-fw fa-solid fa-gears fa-2x" title="Settings"></i><span>Settings</span></a></li>
            </ul> -->

        </div>

    </div>

</nav>
<div class="nav-bar-top">
    <ul class="right-side-bar top-nav nav navbar-nav ml-auto">
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
            <a class="nav-link user-profile" data-toggle="dropdown" href="#" style="height: 49px;">
                <span> {{loggedUserData()['name']}} </span>
                <i class="fa fa-user-circle"></i>
            </a>
        </li>
    </ul>
</div>