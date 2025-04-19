import PropTypes from 'prop-types';

const FormattedNumber = ({ value, locale = 'zh-TW', currency = null }) => {
  const options = currency
    ? { style: 'currency', currency }
    : undefined;

  const formatted = new Intl.NumberFormat(locale, options).format(
    Number(value)
  );

  return <>{formatted}</>;
};


FormattedNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  locale: PropTypes.string,
  currency: PropTypes.string,
};

export default FormattedNumber;