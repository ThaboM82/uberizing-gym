import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { UserEvent } from '../../models/UserEvent';
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
import "./Calendar.scss";

interface CProps {
  getUserEvents: Function;
  currentUserId?: number;
  userEvents: EventsState;
}

interface CState {
  date: Date;
  userEvents: EventsState;
  eventInfo: UserEvent;
  events: Object;
}

class Calendar extends React.Component<CProps, CState> {
  state = {
    date: new Date(),
    userEvents: {} as EventsState,
    eventInfo: {} as UserEvent,
    events: {}
  };

  componentDidMount() {
    this.props.getUserEvents(this.props?.currentUserId);
    let events = {};
    this.props.userEvents.events.map((event) => {
        events[event.id] = event;
    });
    this.setState({ events });
  }

  handleEventRender = (info: any) => {
  }

  render() {
    const userEvents = this.props.userEvents.events;

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
         eventRender={this.handleEventRender}
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