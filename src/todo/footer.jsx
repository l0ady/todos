import '../assets/styles/footer.styl'


export default {
	data() {
		return {
			author: 'l0ady'
		}
	},
	render() {
		return(<div id="footer"><span>written by {this.author}</span></div>)
	}
}
