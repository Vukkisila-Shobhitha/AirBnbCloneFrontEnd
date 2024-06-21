import { differenceInCalendarDays, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMoon,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function BookingDates({ booking, className }) {
  if (!booking?.checkIn || !booking?.checkOut) return null;

  const nights = differenceInCalendarDays(
    new Date(booking.checkOut),
    new Date(booking.checkIn)
  );

  return (
    <div className={className}>
      <div style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faMoon} aria-label="Nights" />
        &nbsp;&nbsp;
        {nights} Nights :
        <div className="booking-date">
          <FontAwesomeIcon icon={faCalendarDays} aria-label="Check-in" />
          &nbsp;&nbsp;
          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
        </div>
        <FontAwesomeIcon icon={faArrowRightLong} />
        <div className="booking-date">
          <FontAwesomeIcon icon={faCalendarDays} aria-label="Check-out" />
          &nbsp;&nbsp;
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </div>
      </div>
    </div>
  );
}

BookingDates.propTypes = {
  booking: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
};

export default BookingDates;