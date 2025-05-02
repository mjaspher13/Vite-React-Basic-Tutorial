import { useState } from 'react';
import PropTypes from 'prop-types';
import USBDrawer, {
  USBDrawerHeader,
  USBDrawerBody,
} from '@usb-shield/react-drawer';
import useForm from '@utils/useForm';
import Loader from '@common/loader/Loader';
import { singleCardSchema } from '@schemas/singleCardValidations';
import SlideMain from './slideMain';
import SlideTransactions from './slideTransactions';
import SlideDrawerFooter from './slideDrawerFooter';
import './slideDrawer.scss';
import { useSelector } from 'react-redux';

/**
 * SlideDrawer component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Flag indicating whether the drawer is open or not.
 * @param {Function} props.handleClose - Function to handle the close event of the drawer.
 * @param {boolean} props.isLoading - Flag indicating whether the component is in a loading state or not.
 * @param {number} props.index - The index of the card.
 * @param {Object} props.card - The card object.
 * @param {boolean} props.editable - Flag indicating whether the card is editable or not.
 * @param {Function} props.setEditable - Function to set the editable state.
 * @returns {JSX.Element} The rendered SlideDrawer component.
 */
const SlideDrawer = ({
  isOpen,
  handleClose,
  isLoading,
  index,
  card,
  editable,
  setEditable,
}) => {
  const { handleStatusUpdate } = useForm(singleCardSchema);
  const { editCards } = useSelector((state) => state.activeCard);
  const [viewTransactions, setViewTransactions] = useState(false);

  return (
    <USBDrawer
      id="activeCards_drawer"
      addClasses="activeCards_drawer"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <USBDrawerHeader id="drawer-header-id">{''}</USBDrawerHeader>
      <USBDrawerBody>
        <div className="card_drawer-body-padding">
          {isLoading ? (
            <Loader
              addClasses={'page-loader'}
              dataTestId={'usb-loading-spinner'}
            />
          ) : (
            <SlideMain
              index={index}
              card={card}
              editable={editable}
              viewTransactions={viewTransactions}
              handleStatusUpdate={handleStatusUpdate}
            />
          )}
        </div>
        {viewTransactions && (
          <SlideTransactions viewTransactions={viewTransactions} />
        )}
      </USBDrawerBody>
      <SlideDrawerFooter
        values={editCards}
        viewTransactions={viewTransactions}
        editable={editable}
        setEditable={setEditable}
        setViewTransactions={setViewTransactions}
        card={card}
      />
    </USBDrawer>
  );
};

SlideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  card: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  setEditable: PropTypes.func.isRequired,
};

export default SlideDrawer;
