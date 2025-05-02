import React from 'react';
import PropTypes from 'prop-types';
import { USBGrid, USBColumn } from '@usb-shield/react-grid';
import './SlideDetailsSection.scss';

const SlideDetailsSection = ({ title, columns, layoutOpts }) => (
  <div className="details-section__wrapper">
    <h2 className="details-section__title">{title}</h2>

    <div className="details-section__body">
      <USBGrid
        gridGap="zero"
        justifyContent="start"
        alignItems="start"
        layoutOpts={layoutOpts}
      >
        {columns.map((col, colIndex) => (
          <USBColumn key={colIndex}>
            {col.map(({ label, value, modClass }) => (
              <div
                key={label}
                className={[
                  'details-section__info-text',
                  modClass || '',
                ].join(' ')}
              >
                <span className="details-section__info-label">{label}</span>
                <span className="details-section__info-value">{value}</span>
              </div>
            ))}
          </USBColumn>
        ))}
      </USBGrid>
    </div>
  </div>
);

SlideDetailsSection.propTypes = {
  title: PropTypes.string.isRequired,
  layoutOpts: PropTypes.shape({
    spans: PropTypes.shape({
      small: PropTypes.number,
      medium: PropTypes.number,
      large: PropTypes.number,
      xlarge: PropTypes.number,
    }),
  }),
  columns: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.node,
        modClass: PropTypes.string,
      })
    )
  ).isRequired,
};

DetailsSection.defaultProps = {
  layoutOpts: { spans: { small: 2, medium: 4, large: 6, xlarge: 8 } },
};

export default SlideDetailsSection;
