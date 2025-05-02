import PropTypes from 'prop-types';
import {
  getCardTransactions,
  deactivateBulkCards,
  updateCardDetails,
} from '@slices/activeCards/thunks';
import { USBDrawerFooter } from '@usb-shield/react-drawer';
import USBButton from '@usb-shield/react-button';
import { USBGrid, USBColumn } from '@usb-shield/react-grid';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Renders the footer component for the slide drawer.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array}  props.values           - The values for the component.
 * @param {boolean} props.viewTransactions - Indicates whether to view transactions.
 * @param {boolean} props.editable         - Indicates whether the component is editable.
 * @param {Function} props.setViewTransactions - Function to set the viewTransactions state.
 * @param {Function} props.setEditable        - Function to set the editable state.
 * @param {Object} props.card               - The card object.
 * @returns {JSX.Element} The rendered component.
 */
const SlideDrawerFooter = ({
  values,
  viewTransactions,
  editable,
  setViewTransactions,
  setEditable,
  card,
}) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.activeCard.errors);
  const creditLimitError = useSelector(
    (state) => state.activeCard.creditLimitError
  );

  return (
    <USBDrawerFooter>
      <USBGrid gridGap="normal">
        {!editable ? (
          <>
            {viewTransactions && (
              <USBColumn
                layoutOpts={{
                  spans: { small: 2, medium: 4, large: 4, xlarge: 4 },
                }}
              >
                <USBButton
                  id="deactivate"
                  ctaStyle="standard"
                  emphasis="minimal"
                  onPress={() => {
                    dispatch(
                      deactivateBulkCards({
                        cardRefs: [{ cardRef: card?.cardRef }],
                      })
                    );
                  }}
                >
                  Deactivate
                </USBButton>
              </USBColumn>
            )}

            {!viewTransactions && (
              <USBColumn
                layoutOpts={{
                  spans: { small: 2, medium: 4, large: 5, xlarge: 5 },
                }}
              >
                <USBButton
                  id="edit_details"
                  ctaStyle="standard"
                  emphasis="subtitle"
                  onPress={() => {
                    setEditable((prev) => !prev);
                  }}
                >
                  Edit details
                </USBButton>
              </USBColumn>
            )}

            <USBColumn
              layoutOpts={{
                spans: { small: 2, medium: 4, large: 5, xlarge: 6 },
              }}
            >
              <USBButton
                id={viewTransactions ? 'view_transactions' : 'deactivate'}
                ctaStyle="standard"
                emphasis={viewTransactions ? 'heavy' : 'minimal'}
                onPress={() => {
                  setViewTransactions((prev) => !prev);
                  if (!viewTransactions) {
                    dispatch(
                      getCardTransactions({
                        cardRefs: [{ cardRef: card?.cardRef }],
                      })
                    );
                  }
                }}
              >
                {viewTransactions && <USBButton.Icon icon="USBIconArrowLeft" />}
                {!viewTransactions ? 'View Transactions' : 'Back'}
              </USBButton>
            </USBColumn>
          </>
        ) : (
          <>
            <USBColumn
              layoutOpts={{
                spans: { small: 2, medium: 4, large: 4, xlarge: 4 },
              }}
            ></USBColumn>
            {viewTransactions && (
              <USBColumn
                layoutOpts={{
                  spans: { small: 2, medium: 4, large: 5, xlarge: 5 },
                }}
              >
                <USBButton
                  id="edit_details"
                  ctaStyle="standard"
                  emphasis="subtitle"
                  onPress={() => {
                    setEditable((prev) => !prev);
                  }}
                >
                  Cancel
                </USBButton>
              </USBColumn>
            )}
            <USBColumn
              layoutOpts={{
                spans: { small: 2, medium: 4, large: 5, xlarge: 6 },
              }}
            >
              <USBButton
                id={viewTransactions ? 'view_transactions' : 'deactivate'}
                ctaStyle="standard"
                emphasis={viewTransactions ? 'heavy' : 'minimal'}
                onPress={() => {
                  if (
                    Object.keys(errors.messages).length === 0 &&
                    !creditLimitError
                  ) {
                    dispatch(updateCardDetails(values));
                  }
                }}
              >
                {viewTransactions && <USBButton.Icon icon="USBIconArrowLeft" />}
                Save changes
              </USBButton>
            </USBColumn>
          </>
        )}
      </USBGrid>
    </USBDrawerFooter>
  );
};

SlideDrawerFooter.propTypes = {
  values: PropTypes.array.isRequired,
  viewTransactions: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  setEditable: PropTypes.func.isRequired,
  setViewTransactions: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};

export default SlideDrawerFooter;
