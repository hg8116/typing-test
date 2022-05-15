import { useEffect, useState, useRef } from "react"
import {
	MainContainer,
	MainWrapper,
	MainH1,
	MainContent,
	MainP,
	MainInput,
	MainRestart,
	MainFooter,
	MainTime,
	MainResult,
	Text,
} from "./MainPageComponents"
import { createUseStyles } from "react-jss"
import randomWords from "random-words"

const NUMB_OF_WORDS = 150
const SECONDS = 60

const useStyles = createUseStyles({
	correctBg: {
		background: "green",
	},
	incorrectBg: {
		background: "red",
	},
})

const MainPage = () => {
	const [words, setWords] = useState([])
	const [countDown, setCountDown] = useState(SECONDS)
	const [currInput, setCurrInput] = useState("")
	const [currWordIndex, setCurrWordIndex] = useState(0)
	const [currCharIndex, setCurrCharIndex] = useState(-1)
	const [currChar, setCurrChar] = useState("")
	const [correct, setCorrect] = useState(0)
	const [incorrect, setIncorrect] = useState(0)
	const [status, setStatus] = useState("waiting")
	const textInput = useRef(null)

	// const correctBg = {
	// 	backgroundColor: "green",
	// }
	// const incorrectBg = {
	// 	backgroundColor: "red",
	// }
	const classes = useStyles()

	useEffect(() => {
		setWords(generateWords())
	}, [])

	useEffect(() => {
		if (status === "started") {
			textInput.current.focus()
		}
	}, [status])

	function generateWords() {
		return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
	}

	function start() {
		if (status === "finished") {
			setWords(generateWords())
			setCurrWordIndex(0)
			setCorrect(0)
			setIncorrect(0)
			setCurrCharIndex(-1)
			setCurrChar("")
		}
		if (status !== "started") {
			setStatus("started")
			let interval = setInterval(() => {
				setCountDown((prevCountDown) => {
					if (prevCountDown === 0) {
						clearInterval(interval)
						setStatus("finished")
						setCurrInput("")
						return SECONDS
					} else {
						return prevCountDown - 1
					}
				})
			}, 1000)
		}
	}

	function handleKeyDown({ keyCode, key }) {
		if (keyCode === 32) {
			checkMatch()
			setCurrInput("")
			setCurrWordIndex(currWordIndex + 1)
			setCurrCharIndex(-1)
		} else if (keyCode === 8) {
			setCurrCharIndex(currCharIndex - 1)
			setCurrChar("")
		} else {
			setCurrCharIndex(currCharIndex + 1)
			setCurrChar(key)
		}
	}

	function checkMatch() {
		const wordToCompare = words[currWordIndex]
		const doesItMatch = wordToCompare === currInput.trim()
		if (doesItMatch) {
			setCorrect(correct + 1)
		} else {
			setIncorrect(incorrect + 1)
		}
	}

	function getCharClass(wordIdx, charIdx, char) {
		if (
			wordIdx === currWordIndex &&
			charIdx === currCharIndex &&
			currChar &&
			status !== "finished"
		) {
			if (char === currChar) {
				return classes.correctBg
			} else {
				return classes.incorrectBg
			}
		} else if (
			wordIdx === currWordIndex &&
			currCharIndex >= words[currWordIndex].length
		) {
			return classes.incorrectBg
		} else {
			return ""
		}
	}

	return (
		<MainContainer>
			<MainWrapper>
				<MainH1>Typing Test</MainH1>
				<MainContent>
					<MainTime>{countDown}</MainTime>
					{status === "started" && (
						<MainP>
							{words.map((word, i) => (
								<span key={i}>
									<span>
										{word.split("").map((char, idx) => (
											<span
												className={getCharClass(i, idx, char)}
												// style={getCharClass(i, idx, char)}
												key={idx}>
												{char}
											</span>
										))}
									</span>
									<span> </span>
								</span>
							))}
						</MainP>
					)}
					{status === "finished" && (
						<MainResult>
							{/* <Accuracy> */}
							{/* <Text>Accuracy: </Text> */}
							<Text>
								Accuracy: {Math.round((correct / (correct + incorrect)) * 100)}%
							</Text>
							{/* </Accuracy> */}
							{/* <Text> </Text> */}
							<Text>Words Per Minute: {correct}</Text>
							<Text>Lang: EN</Text>
							<Text>Time: 60 sec</Text>
						</MainResult>
					)}
					{status === "started" && (
						<MainInput
							ref={textInput}
							disabled={status !== "started"}
							placeholder='Type here'
							onKeyDown={handleKeyDown}
							onChange={(e) => setCurrInput(e.target.value)}
							value={currInput}></MainInput>
					)}
					{status !== "started" && (
						<MainRestart onClick={start}>Start</MainRestart>
					)}
				</MainContent>
				<MainFooter></MainFooter>
			</MainWrapper>
		</MainContainer>
	)
}

export default MainPage
