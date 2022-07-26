@extends('layouts.default')
@section('page_title')
   Contact List
@stop
@section('contact-content')
   <div class="panel panel-default">
      <div class="panel-heading">Contact's List</div>
      <div class="panel-body">
         <div class="table-responsive">
            <table id="contact-form" class="table table-bordered table-striped">
               <thead>
                  <tr>
                     <th data-code="eStatus" class="status">Communication Status</th>
                     <th data-code="status_date" class="status_date">Status Date</th>
                     <th data-code="last_con_date" class="last_con_date">Recent Conversation Date</th>
                     <th data-code="discuss_point" class="discuss_point">Discussion Points</th>
                     <th data-code="next_steps" class="next_steps">Next Steps</th>
                     <th data-code="next_action_date" class="next_action_date">Next Action Date</th>
                     <th data-code="contact_name" class="contact_name">Contact Name</th>
                     <th data-code="eRelationshipStatus" class="rel_status">Relationship Status</th>
                     <th data-code="design" class="design">Designation</th>
                     <th data-code="repo_mangr" class="repo_mangr">Reporting Manager</th>
                     <th data-code="company_name" class="company_name">Current Company Name</th>
                     <th data-code="website" class="website">Company Website</th>
                     <th data-code="history" class="history">Relationship History (Year 2005+)</th>
                     <th data-code="industry" class="industry">Industry</th>
                     <th data-code="city" class="city">City</th>
                     <th data-code="state" class="state">States</th>
                     <th data-code="country" class="country">Country Name</th>
                     <th data-code="con_linked" class="con_linked">Contact LinkedIn</th>
                     <th data-code="email" class="email">Email</th>
                     <th data-code="eReachoutCategory" class="reach_out_cat">Reach-out Category</th>
                     <th data-code="work_phone" class="work_phone">Work Phone</th>
                     <th data-code="mobile" class="mobile">Mobile</th>
                     <th data-code="eCategory" class="lead_category">Lead Category</th>
                     <th data-code="touch_points" class="touch_points">Touch Points</th>
                     <th data-code="eAdaptability" class="adapt_to_change">Adaptability to Change</th>
                     <th data-code="eDispositionTowards" class="disposition">Disposition towards</th>
                     <th data-code="eCoverage" class="coverage">Coverage</th>
                     <th data-code="response" class="response">Response</th>
                  </tr>
               </thead>
            </table>
         </div>
      </div>
   </div>
@stop

@section('scripts')
<script src="{{ asset('js/jquery.dataTables.min.js') }}"></script>
<script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.js"></script>
<script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/colreorder/1.5.6/js/dataTables.colReorder.min.js"></script>
<script src="{{ asset('js/contact-form.js') }}"></script>
<link rel="stylesheet" href="{{ asset('css/jquery.dataTables.min.css') }}" type="text/css" >
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet">
@stop

<script>
   var column_pre_data = @json($enum_values);
</script>