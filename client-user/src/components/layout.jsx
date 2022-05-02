import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { BottomNavigation, Container } from '@mui/material';

const Layout = () =>  {
  return (
    <div>
		<div>
			<BottomNavigation
				showLabels
			>
				<Link to="/">Home</Link>
			</BottomNavigation>
		</div>
		<Container>
			<Outlet />
		</Container>
	</div>
  );
}

export default Layout;