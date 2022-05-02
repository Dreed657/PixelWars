import React from 'react';
import { Outlet } from 'react-router-dom';

import { BottomNavigation, Link, Container } from '@mui/material';

const Layout = () =>  {
  return (
    <div>
		<div>
			<BottomNavigation
				showLabels
			>
				<Link href="/">Home</Link>
			</BottomNavigation>
		</div>
		<Container>
			<Outlet />
		</Container>
	</div>
  );
}

export default Layout;