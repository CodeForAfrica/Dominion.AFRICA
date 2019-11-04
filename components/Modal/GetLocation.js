import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import createAPI from '../../lib/api';
import config from '../../dominion.config';

const styles = {
  locationText: {
    outline: 'none',
    color: 'white',
    fontSize: '0.93rem',
    fontWeight: 'bold',
    display: 'inline-block',
    '&:hover': {
      color: '#e7e452'
    }
  }
};

class GetLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { buttonText: 'Use your current Location' };
    this.findLocation = this.findLocation.bind(this);
  }

  findLocation() {
    this.setState(() => ({ buttonText: 'Locating   .....' }));

    const locateMe = ({ error, address }) => {
      // If not really there
      if (error || !address) {
        this.setState(() => ({ buttonText: 'Could not locate you   .....' }));
      } else {
        // Find country
        const foundEntry = Object.entries(config.countries).find(
          ([, country]) => address.country === country.name
        );
        if (foundEntry) {
          const [slug] = foundEntry;
          window.location = slug;
        } else {
          this.setState(() => ({
            buttonText: `Oops.. 
            ${address.country} is not in Dominion`
          }));
        }
      }
    };

    const api = createAPI();
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { data } = await api.getLocation(position);
        locateMe(data);
      },
      failure => {
        this.setState(() => ({ buttonText: failure.message }));
      },
      {
        timeout: 10000
      }
    );
  }

  render() {
    const { classes } = this.props;
    const { buttonText } = this.state;

    return (
      <div
        role="button"
        tabIndex="0"
        onClick={this.findLocation}
        onKeyPress={this.findLocation}
        className={classes.locationText}
      >
        {buttonText}
      </div>
    );
  }
}

GetLocation.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(GetLocation);
