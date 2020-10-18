import React from 'react';

import Chip from '@material-ui/core/Chip';

export default ({ interests }) => {
  return <div>
    {
      interests && interests.length ?
      interests.map((interest, index) => {
        return <div key={`interest-${index}`}>
          <Chip
          label={`#${interest.title}`}
          variant="outlined"
        />
        </div>
      }) : '?'
    }
  </div>
}
