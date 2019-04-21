import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText';
import team from '../image/team.jpeg'
import validator from 'validator'
import { ApiConstant } from '../constant'
import { doRegister } from '../action/register.action'
import { doLogin } from '../action/user.action'
import { connect } from 'react-redux'

const apiConst = new ApiConstant()

const styles = {
    parent1: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        
    },
    appName: {
        // height: '150px',
        color: '#2965CC',
        fontSize: '1.5rem'
    },
    desc: {
        padding: '30px 0px',
        fontSize: '1.25rem',
        '& span': {
            fontSize: '1rem',
            color: '#676565'
        }
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'streach',
        justifyContent: 'start',
        width: '100%'
    },
    button: {
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0 10px 0',
    },
    text: {
        minWidth: '100%'
    },
    image: {
        height: '100%',
        backgroundImage: `url(${team})`,
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
        
    },
    parent: {
        height: '100%',
        width: '100%',
        boxSizing: 'content-box',
    }

}

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            showLogin: true,
            showRegister: false,
            loginUser: {
                email: '',
                password: ''
            },
            registerUser: {
                full_name: '',
                email: '',
                password: ''
            },
            LoggedUserData: {},
            LoginDataIsTrue: false,
            registerDataIsTrue: false
        }
    }

    _handleChangeLogin = (event, attr) => {
        event.preventDefault()
        const logindata = Object.assign({}, this.state.loginUser)
        logindata[attr] = event.target.value
        if (!validator.isEmpty(logindata[attr])) {
            this.setState(() => {
            return {
                ...this.state,
                loginUser: logindata
            }
            }, () => this._enableLoginBtn())
        }
    }

    _enableLoginBtn = () => {
        if((validator.isEmail(this.state.loginUser.email)  && !validator.isEmpty(this.state.loginUser.password))) {
            this.setState(() => {
                return {
                    ...this.state,
                    LoginDataIsTrue: true
                }
            })
        } 
    }

    _handleChangeRegister = (event, attr) => {
        event.preventDefault()
        const registerData = Object.assign({}, this.state.registerUser)
        registerData[attr] = event.target.value 
            this.setState(() =>{
                return {
                    ...this.state,
                    registerUser: registerData
                }
            }, () => this._enableRegisterBtn())
        
    }

    _enableRegisterBtn = () => {
        if (!validator.isEmpty(this.state.registerUser.full_name) && validator.isEmail(this.state.registerUser.email) && !validator.isEmpty(this.state.registerUser.password)) {
            this.setState(() => {
                return {
                    ...this.state,
                    registerDataIsTrue: true
                }
            })
        } else {
            
        }
    }
    _openRegisterForm = () => {
        this.setState(state => ({
            showRegister: !state.showRegister,
            showLogin: !state.showLogin
        }));
    }

    _handleDoLogin = () => {
        if (validator.isEmail(this.state.loginUser.email)  && !validator.isEmpty(this.state.loginUser.password)) {

            const loginObject = {
                url: apiConst.BASE_URL + apiConst.LOGIN,
                body: this.state.loginUser
            }
            this.props.doLogin(loginObject)
        } else {
            alert("please check if the details are correct or not")
        }
        
    }

    _handleDoRegister = () => {
        if (validator.isEmail(this.state.registerUser.email) &&  !validator.isEmpty(this.state.registerUser.password) && !validator.isEmpty(this.state.registerUser.full_name) ) {
            const registerObject = {
                url: apiConst.BASE_URL + apiConst.REGISTER,
                body: this.state.registerUser
            }
            this.props.doRegister(registerObject)
        } else {
            alert("please check if the details are correct or not")
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        // console.log(nextProps.userReducer)
        if (nextProps.userReducer.status && nextProps.userReducer.value !== null) {
            this.setState(() => {
                return {
                    ...this.state,
                    LoggedUserData: nextProps.userReducer.value
                }
            })
            // console.log(this.state.LoggedUserData)
            this.props.history.push('/landingPage')
        } 
    }




    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Grid container spacing={0} className={classes.parent}>
                    <Grid item xs={8} sm={8} className={classes.image}>
                        
                    </Grid>
                    <Grid item xs={4} sm={4} className={classes.parent1}>
                    <div className={classes.parent1}>
                        <div className={classes.appName} style={{color: '#2965CC'}}>
                            <h3 >Kanban Board</h3>
                        </div>
                        <div className={classes.desc}>
                            Kanban as a visual management tool can get work delivered faster and more often. Prioritized tasks are completed first as the team collectively decides what is best using visual cues from the kanban board.
                        </div>
                        <div className={classes.loginForm}>

                            { this.state.showLogin && <form>
                                <FormHelperText>Enter the Details below to Login</FormHelperText> 
                            <TextField
                                required    
                                label="Email"
                                type="email"
                                name="email"
                                onChange={(e) => { this._handleChangeLogin(e, 'email')}}
                                autoComplete="email"
                                margin="normal"
                                variant="filled"
                                className={classes.text}
                                
                            />
                            <br/>

                            <TextField
                                required
                                label="Password"
                                onChange={(e) => { this._handleChangeLogin(e,'password')}}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="filled"
                                className={classes.text}
                            />
                            <div className={classes.button}>
                                <Button variant="contained" size="large" type="button" color="primary" className={classes.margin} onClick={() => this._handleDoLogin()} disabled={!this.state.LoginDataIsTrue}>
                                    Login
                                </Button>
                                <Button variant="contained" size="large" type="button" color="primary" className={classes.margin} onClick={this._openRegisterForm}>
                                    signup
                            </Button>
                            </div>
                            </form>
                        }
                        {
                            this.state.showRegister && 
                            <form>
                                <FormHelperText>Enter the Details below to Register</FormHelperText>    
                                <TextField
                                required
                                label="User full name"
                                type="text"
                                name="full_name"
                                onChange={(e) => this._handleChangeRegister(e,'full_name')}
                                autoComplete="full_name"
                                margin="normal"
                                variant="filled"
                                className={classes.text}
                            />
                            <br />
                            <TextField
                                required
                                id="filled-full-width"
                                label="Email"
                                className={classes.text}
                                type="email"
                                name="email"
                                onChange={(e) => this._handleChangeRegister(e,'email')}
                                autoComplete="email"
                                margin="normal"
                                variant="filled"
                                
                            />
                            <br/>
                            <TextField
                                required
                                label="Password"
                                className={classes.text}                                
                                onChange={(e) => this._handleChangeRegister(e,'password')}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="filled"
                            />
                            <div className={classes.button}>
                                <Button variant="contained" size="medium" type="button" color="primary" onClick={() => this._handleDoRegister()} disabled={!this.state.registerDataIsTrue}>
                                    Register
                                </Button>
                                <Button variant="contained" size="medium" type="button" color="primary" onClick={() => this._openRegisterForm()} >
                                    Already a user?
                                </Button>
                            </div>
                            
                            </form>
                        }

                        </div>
                    </div>
                        
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (loginObject) => dispatch(doLogin(loginObject)),
        doRegister: (registerObject) => dispatch(doRegister(registerObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Login))