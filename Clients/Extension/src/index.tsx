import { render } from 'preact';
import { useState } from 'preact/hooks';
import viteLogo from '/vite.svg';
import './style.css';

export function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} class="logo" alt="Vite logo" />
				</a>
			</div>
			<h1 className='bg-red-700'>Vite + Preact</h1>
		</>
	);
}

render(<App />, document.getElementById('app'));
