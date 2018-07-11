export default {
	isAuthenicated: function(){
		return fetch("http://localhost:8000/user", {
			      method: 'GET',
			      credentials: 'include',
			      mode: 'cors'
			    });
	},
	signup: function(data){
		return fetch("http://localhost:8000/signup", {
			        method: 'POST',
			        body: JSON.stringify(data),
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",
			            // "Content-Type": "application/x-www-form-urlencoded",
			        },
			        credentials: 'include',
			        mode: 'cors'
			      });
	},
	signin: function(data){
		return fetch("http://localhost:8000/signin", {
			        method: 'POST',
			        body: JSON.stringify(data),
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",
			            // "Content-Type": "application/x-www-form-urlencoded",
			        },
			        credentials: 'include',
			        mode: 'cors'
			      });
	},
	handlelogout: function(){
		return fetch("http://localhost:8000/logout", {
			      method: 'GET',
			      credentials: 'include',
			      mode: 'cors'
			    });
	},
	postItem: function(data){
		return fetch("http://localhost:8000/api/item", {
			        method: 'POST',
			        body: JSON.stringify(data),
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",
			            // "Content-Type": "application/x-www-form-urlencoded",
			        },
			        credentials: 'include',
			        mode: 'cors'
			      });
	},
	getUserAccount: function(){
		return fetch("http://localhost:8000/api/account", {
			      method: 'GET',
			      credentials: 'include',
			      mode: 'cors'
			    });
	},
	createAccount: function(data){
		return fetch("http://localhost:8000/api/account", {
			        method: 'POST',
			        body: JSON.stringify(data),
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",
			            // "Content-Type": "application/x-www-form-urlencoded",
			        },
			        credentials: 'include',
			        mode: 'cors'
			    });
	},
	updateAccount: function(data){
		return fetch("http://localhost:8000/api/account", {
			        method: 'PUT',
			        body: JSON.stringify(data),
			        headers: {
			            "Content-Type": "application/json; charset=utf-8",
			            // "Content-Type": "application/x-www-form-urlencoded",
			        },
			        credentials: 'include',
			        mode: 'cors'
			    });
	}
}
