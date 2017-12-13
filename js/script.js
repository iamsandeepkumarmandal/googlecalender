$(document).ready(function () {

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay,listWeek'
        },
        defaultDate: '2017-11-12',
        defaultView: 'agendaWeek',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2017-11-01',
            },
            {
                title: 'Long Event',
                start: '2017-11-07',
                end: '2017-11-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2017-11-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2017-11-16T16:00:00'
            },
            // {
            // 	title: 'Conference',
            // 	start: '2017-11-11',
            // 	end: '2017-11-13'
            // },
            {
                title: 'Meeting',
                start: '2017-11-12T10:30:00',
                end: '2017-11-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2017-11-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2017-11-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2017-11-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2017-11-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2017-11-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2017-11-28'
            }
        ],
        dayClick: function (date, jsEvent, view) {
           
            //console.log('Clicked on: ' + date.format('ddd, MMM Do'));
            //console.log('Time is   : ' + date.format('LT'));
            //console.log('Day  is   : ' + date.format('ddd,D MMM'));
            var getDate = date.format('ddd, MMM Do');
            var getTime = date.format('h:mm a');//LT
            //30 Minutes time increment
            var getEndTime = incrementtime(getTime);

            $("#txt_start_date,#txt_end_date").val(getDate);
            $("#txt_start_time").val(getTime);
            $("#txt_end_time").val(getEndTime);
            $(".schedule-event-popup-wrapper_js").addClass("active");
        },
        eventClick: function (calEvent, jsEvent, view) {
            var getEventTitle = calEvent.title;
            var getStartDate = calEvent.start.format('ddd, MMM Do');
            var getStartTime = calEvent.start.format('h:mm a');
            if (event.end) {
                var getEndTime = calEvent.end.format('h:mm a');
                $("#txt_end_time").val(getEndTime);
                console.log(getEndTime);
            }
            
            $("#txt_start_date,#txt_end_date").val(getStartDate);
            $("#txt_start_time").val(getStartTime);
            $("#text_topic").val(getEventTitle);
            $(".schedule-event-popup-wrapper_js").addClass("active");
        },
        windowResize: function(view) {
            var getheightofwindow = $(window).height();
            $('#calendar').fullCalendar('option', 'height', getheightofwindow);
        }
    });
    
    $(".closePopupEventsSchduler_js").click(function () {
         //Reset the Scheduler Form
         resetEventsForm();
         //Js to  Close the Event Scheduler Popup
        $(".schedule-event-popup-wrapper").removeClass("active");
    });
    // $("#txt_start_date").fdatepicker({
    // 	minView: 2,
    // 	format: 'MM dd'
    // });
    $('#txt_start_time').timepicker({
        'timeFormat': 'g:i a',
        'autoclose': 'true'
    });
    $('#txt_end_time').timepicker({
        'timeFormat': 'g:i a',
        'autoclose': 'true'
    });
    $('#txt_start_time').on('changeTime', function () {
        let a = $(this).val();
        let b = incrementtime(a);
        $("#txt_end_time").val(b);
    });
    $('#txt_start_date,#txt_end_date').pickadate({
        format: 'ddd, mmm ddth'
    });
    
});

// Function to Change the End Time (Increment by 30 Minutes)
function incrementtime(a) {
    return moment('' + a + '', 'h:mm a')
        .add(30, 'minutes')
        .format('h:mm a');

}
//Function to Reset the Scheduler Form
function resetEventsForm(){
    $('.schedule-event-popup').find('form')[0].reset();
}

$("#myForm").submit(function (e) {
    e.preventDefault();
    $('#myForm').validator();
});