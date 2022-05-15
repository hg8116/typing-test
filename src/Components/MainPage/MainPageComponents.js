import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
`

export const MainContainer = styled.div`
	background: #f5f5f5;
	height: 100vh;
	/* overflow: hidden; */
`

export const MainWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #000;
	padding: 4em;
`

export const MainH1 = styled.h1`
	color: #4d724d;
	animation: ${fadeIn} 0.7s linear;
`

export const MainTime = styled.h2`
	color: #8db48e;
	animation: ${fadeIn} 0.7s linear;
`

export const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const MainP = styled.div`
	user-select: none;
	max-width: 1100px;
	text-align: center;
	font-family: "Archivo";
	font-size: 20px;
	letter-spacing: 2px;
	word-spacing: 4px;
	line-height: 30px;
	margin-top: 30px;
	margin-bottom: 30px;
	animation: ${fadeIn} 0.7s linear;
`

export const MainInput = styled.input`
	border-style: none;
	outline: none;

	width: 100%;
	max-width: 300px;
	margin: 0 auto;
	margin-bottom: 20px;
	border-radius: 2px;
	font-size: 16px;
	padding: 1rem 1.6rem;
	background: #fff;
	caret-color: #4d724d;
	color: #4d724d;
`

export const MainRestart = styled.button`
	background: none;
	color: inherit;
	margin: 15px;
	margin-top: 40px;
	border: 1px solid black;
	border-radius: 25px;
	padding: 0.7em 1.5em;
	font: inherit;
	cursor: pointer;
	transition: 0.7s ease-in-out;
	animation: ${fadeIn} 0.7s linear;

	&:hover {
		transform: scale(0.9);
		background: #000;
		color: #f5f5f5;
	}
`
export const MainResult = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	justify-content: center;
	animation: ${fadeIn} 0.7s linear;
`

export const Text = styled.p`
	display: inline;
	font-size: 1.2em;
	margin: 10px;
`

export const MainFooter = styled.div``
