import * as React from 'react';
import Table from '../Table/Table';
import './landingPage.scss';

// test commit
const LandingPage: React.FC = () => {
	return (
		<div className={'landingPage'}>
			<div className={'content'}>
				<Table />
			</div>
		</div>
	);
};

export default LandingPage;
