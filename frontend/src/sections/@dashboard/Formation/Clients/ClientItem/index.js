import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// react router
import { useParams } from 'react-router';

import Employees from './Employees';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ClientItem() {
  const [value, setValue] = React.useState(0);

  const params = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Employees" {...a11yProps(0)} />
          <Tab label="GIAC" {...a11yProps(1)} />
          <Tab label="MPME" {...a11yProps(2)} />
          <Tab label="OFPPT" {...a11yProps(3)} />
          <Tab label="Formation" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Employees clientId={params.id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        GIAC
      </TabPanel>
      <TabPanel value={value} index={2}>
        MPME
      </TabPanel>
      <TabPanel value={value} index={3}>
        OFPPT
      </TabPanel>
      <TabPanel value={value} index={4}>
        Formation
      </TabPanel>
    </Box>
  );
}
