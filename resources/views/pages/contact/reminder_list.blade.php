@extends('layouts.default')
@section('page_title')
   Contact List
@stop

@section('content')
<div class="container-fluid">
   <div class="row">
      <div class="col-md-12">
         @if(!empty($data))
         <div class="timeline">
            @php($count = 1)
            @foreach($data as $key => $val)
               <div class="time-label @if($count <= 5) collapsed @endif" data-toggle="collapse" data-target="#collapse{{$count}}" @if($count > 5) aria-expanded="false" @else aria-expanded="true" @endif >
                  <span class="bg-red">{{$key}}</span>
               </div>
               @foreach($val as $s_key => $s_val)
                  <div id="collapse{{$count}}" class="collapse @if($count <= 5) in @endif" @if($count > 5) aria-expanded="false" @else aria-expanded="true" @endif>
                     <i class="fas fa-solid fa-angle-right"></i>
                     <div class="timeline-item">
                        <span class="time"><i class="fas fa-clock"></i> {{$s_val['reminder_time']}}</span>
                        <h3 class="timeline-header">{{$s_val['tSubject']}} [{{$s_val['tAttendees']}}]</h3>
                        <div class="timeline-body">{{$s_val['tNotes']}}</div>
                     </div>
                  </div>
               @endforeach
            @php($count++)
            @endforeach
            <div><i class="fas fa-clock bg-gray"></i></div>
         </div>
         @else
            <h3 class="alert"><i class="fas fa-exclamation-triangle text-warning"></i> Oops! No records found.</h3>
         @endif
      </div>
   </div>
</div>
@stop
