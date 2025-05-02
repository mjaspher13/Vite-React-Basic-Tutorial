/* eslint-disable no-unused-vars */
import { useState } from 'react';
import SearchFilters from '../table/searchFilter/searchFilters';
import USBSearchInput from '@usb-shield/react-search-input';
import USBAccordion from '@usb-shield/react-accordion';
import USBDropdown from '@usb-shield/react-dropdown';
import { USBColumn, USBGrid } from '@usb-shield/react-grid';
import '@usb-shield/react-dropdown/dist/library/styles/index.css';
import '@usb-shield/react-search-input/dist/library/styles/index.css';
// import '@usb-shield/react-accordion/dist/library/styles/scss/index.scss';
import './slideTransaction.scss';
import { useSelector } from 'react-redux';

const SlideTransactions = () => {
  const [searchValue, setSearchValue] = useState('');
  const [updateByError, setUpdateByError] = useState(false);
  const [updateByErrorText, setUpdateByErrorText] = useState('');
  const isLoading = useSelector((state) => state.activeCard.isLoading);
  const transactions = useSelector((state) => state.activeCard.transactions);

  const parseTransactions = (transactions) => {
    return transactions?.map((item) => {
      return {
        headingText: (
          <USBGrid
            gridGap="half"
            justifyContent="stretch"
            className="grid-filter"
          >
            <USBColumn
              layoutOpts={{
                spans: { small: 12, medium: 12, large: 12, xlarge: 12 },
              }}
            >
              <span className="card_transaction-merchantName">
                {item.merchantName}
              </span>
              {item.transactionId}
            </USBColumn>
            <USBColumn
              layoutOpts={{
                spans: { small: 4, medium: 4, large: 4, xlarge: 4 },
              }}
            >
              <div className="card_transaction-transactionAmount">
                {item.transactionAmount}
              </div>
            </USBColumn>
          </USBGrid>
        ),
        children: (
          <USBGrid
            gridGap="half"
            justifyContent="stretch"
            className="grid-filter"
          >
            <USBColumn
              layoutOpts={{
                spans: { small: 8, medium: 8, large: 8, xlarge: 8 },
              }}
            >
              <span className="card_transaction-merchantName">
                Status: {item.transactionStatus}
              </span>
              Sort: {item.transactionSort}
            </USBColumn>
            <USBColumn
              layoutOpts={{
                spans: { small: 8, medium: 8, large: 8, xlarge: 8 },
              }}
            >
              <div className="card_transaction-transactionAmount">
                Date: {item.transactionDate}
              </div>
              <div className="card_transaction-transactionAmount">
                Day: {item.transactionDay}
              </div>
            </USBColumn>
          </USBGrid>
        ),
      };
    });
  };

  return (
    <div>
      <h2 className="card__details-label">Activity</h2>
      <div className="card__transactions-label">Completed</div>
      {!isLoading && (
        <USBAccordion
          id="test-id_1"
          addClasses="test-class"
          accordions={parseTransactions(transactions)}
        />
      )}
    </div>
  );
};

export default SlideTransactions;
