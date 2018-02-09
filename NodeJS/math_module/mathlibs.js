module.exports = function() {
	return {
		multiply: function(num1, num2) {
				return num1 * num2
		},
		add: function(num1, num2) {
				return num1 + num2
		},
		square: function(num){
				return Math.pow(num, 2);
		},
		random: function(num1, num2){
				// Returs random integer
				// min = Math.ceil(num1)
				// max = Math.ceil(num2)
				//return Math.floor((Math.random() * (max - min)) + min)

				// Returns random number
				return Math.random() * (num2 - num1) + num1
		}
	}
};