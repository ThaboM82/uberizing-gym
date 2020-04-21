import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { EventsState } from '../../reducers/user';
import { getUserEvents } from '../../actions';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

interface CProps {
  getUserEvents: Function;
  currentUserId?: number;
  userEvents?: EventsState;
}

interface CState {
  date: Date;
  userEvents?: EventsState;
}

class Calendar extends React.Component<CProps, CState> {
  state = {
    date: new Date(),
    userEvents: {} as EventsState,
  };

  componentDidMount() {
    this.props.getUserEvents(this.props?.currentUserId);
  }

  handleDateClick = (arg: any) => {
    console.log(arg.dateStr);
  };

  handleEventClick = (info: any) => {
    console.log(info);
  };

  render() {
    const userEvents = this.props?.userEvents?.events;
    return (
      <Container fluid>
        <FullCalendar
         height={600}
         weekends={true}
         header={{
          left: 'prevYear,prev,next,nextYear today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
         }}
         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
         dateClick={this.handleDateClick}
         eventClick={this.handleEventClick}
         events={userEvents}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: CState) => ({
  userEvents: state.userEvents,
});

export default connect(mapStateToProps, { getUserEvents })(Calendar);