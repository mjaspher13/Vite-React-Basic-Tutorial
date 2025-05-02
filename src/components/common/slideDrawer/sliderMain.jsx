import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import USBButton from '@usb-shield/react-button';
import { USBColumn, USBGrid } from '@usb-shield/react-grid';
import CardImage from '@common/card/cardImage/cardImage';
import CardHolder from '@common/card/cardHolder/cardHolder';
import ActiveCardForm from '@common/form/activeCardForm';
import { sendOTP } from '@slices/otpSlice';
import {
  setShowCardInfo,
  setShowOtp,
} from '@slices/activeCards/activeCardSlice';
import { formatCreditCardExpiration } from '@utils/helpers';
import './slideMain.scss';

/**
 * Renders the SlideMain component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.index - The index of the slide.
 * @param {Object} props.card - The card object.
 * @param {boolean} props.editable - Indicates if the card is editable.
 * @param {boolean} props.viewTransactions - Indicates if the transactions are being viewed.
 * @param {Function} props.handleStatusUpdate - The function to handle status updates.
 * @returns {JSX.Element} The rendered SlideMain component.
 */
const SlideMain = ({
  index,
  card,
  editable,
  viewTransactions,
  handleStatusUpdate,
}) => {
  const dispatch = useDispatch();
  const {
    user: { email },
  } = useSelector((state) => state.user);
  const { showCardInfo, otpFlow } = useSelector((state) => state.activeCard);

  /**
   * Toggles the visibility of card information and sends an OTP to the user's email.
   *
   * This function dispatches an action to send an OTP to the user's email and toggles the visibility of card info.
   * It also shows the OTP input field.
   */
  const hideShowCardInfo = () => {
    if (otpFlow) {
      // Dispatch an action to send an OTP to the user's email
      dispatch(sendOTP(email));

      // Show the OTP input field
      dispatch(setShowOtp(true));
    }

    // Toggle the visibility of card information if it is currently shown
    if (showCardInfo) {
      dispatch(setShowCardInfo(!showCardInfo));
    }
  };

  return (
    <>
      <div id="drawer-header-id">Account details</div>
      <div className="card__drawer">
        {!viewTransactions && (
          <>
            <CardImage card={card} />
            <USBButton
              className="card__button"
              ctaStyle="standard"
              emphasis="subtitle"
              onPress={hideShowCardInfo}
            >
              {showCardInfo ? 'Hide Card Details' : 'Show Card Details'}
            </USBButton>
          </>
        )}

        {editable ? (
          <>
            <CardHolder card={card} />
            <ActiveCardForm
              card={card}
              index={index}
              handleStatusUpdate={handleStatusUpdate}
            />
          </>
        ) : (
          <>
            <h2 className="card__details-label">Card details</h2>
            <div className="card__details">
              <USBGrid gridGap="zero" justifyContent="start" alignItems="start">
                <USBColumn
                  layoutOpts={{
                    spans: { small: 2, medium: 4, large: 6, xlarge: 8 },
                  }}
                >
                  <div className="card__info-text">
                    <span className="card__info-label">Card number</span>
                    <span>
                      {card?.cardNumber || '•••• •••• •••• ••••'}
                      {/* <USBButton
                        emphasis="minimal"
                        size="small"
                        onPress={hideShowCardInfo}
                      >
                        {showCardInfo ? <USBIconHide2 /> : <USBIconShow2 />}
                      </USBButton> */}
                    </span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Security Code</span>
                    <span>{card?.securityCode || '•••'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Credit Limit</span>
                    <span>${card?.creditLimit || '0'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Valid From</span>
                    <span>{card?.validFrom || 'N/A'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Field 1</span>
                    <span>{card?.field1 || 'N/A'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Notes</span>
                    <span>{card?.notes || 'N/A'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Created by</span>
                    <span>{card?.approvername || 'N/A'}</span>
                  </div>
                </USBColumn>
                <USBColumn
                  layoutOpts={{
                    spans: { small: 2, medium: 4, large: 6, xlarge: 8 },
                  }}
                >
                  <div className="card__info-text"></div>
                  <div className="card__info-text">
                    <span className="card__info-label">Expiration Date</span>
                    <span>
                      {formatCreditCardExpiration(card?.cardExpiryDate) ||
                        'N/A'}
                    </span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Available credit</span>
                    <span>${card?.availableLimit || '0'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Valid To</span>
                    <span>{card?.validTo || 'N/A'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Field 2</span>
                    <span>{card?.field2 || 'N/A'}</span>
                  </div>
                  <div className="card__info-text">
                    <span className="card__info-label">Date Created</span>
                    <span>{card?.cardCreatedDate || 'N/A'}</span>
                  </div>
                </USBColumn>
              </USBGrid>
            </div>
            <CardHolder card={card} />
          </>
        )}
      </div>
    </>
  );
};

SlideMain.propTypes = {
  index: PropTypes.number,
  card: PropTypes.shape({
    name: PropTypes.string,
    emailId: PropTypes.string,
    mobileNumber: PropTypes.string,
    employeeId: PropTypes.string,
    cardNumber: PropTypes.string,
    cardExpiryDate: PropTypes.string,
    securityCode: PropTypes.string,
    creditLimit: PropTypes.number,
    validFrom: PropTypes.string,
    field1: PropTypes.string,
    notes: PropTypes.string,
    approvername: PropTypes.string,
    availableLimit: PropTypes.number,
    validTo: PropTypes.string,
    field2: PropTypes.string,
    cardCreatedDate: PropTypes.string,
  }),
  editable: PropTypes.bool,
  viewTransactions: PropTypes.bool,
  handleStatusUpdate: PropTypes.func,
};

export default SlideMain;
