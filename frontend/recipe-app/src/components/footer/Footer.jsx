export default function Footer() {

	const year =  new Date().getFullYear()

	const styles = {
		footer: {
			background: "#222",
			color: "#fff",
			padding: "30px 0"
		},
		text: {
			color: "#fff",
			textAlign: "center"
		}
	}

	return(
		<footer style={styles.footer}>
			<p style={styles.text}>Copyright (c) {year} Author. All Rights Reserved.</p>
		</footer>
	)
}
