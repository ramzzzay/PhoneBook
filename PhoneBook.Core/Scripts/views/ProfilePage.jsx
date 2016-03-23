﻿var ChangePassword = React.createClass({
    getInitialState: function() {
        return {};
    },
    SendToServer: function(es) {
        es.preventDefault();
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        var data = {
            OldPassword: $("#OldPassword").val(),
            NewPassword: $("#NewPassword").val(),
            ConfirmPassword: $("#ConfPassword").val()
        };
        //console.log(data);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function (data) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            console.log(data);
        }).fail(function(ee) {
            alert(ee);
        });
    },
    componentDidMount: function() {
        console.log(this.props.url);
    },
    render: function() {
        return (
            <div>
    <form onSubmit={this.SendToServer}>
        <input type="password" required={true}
                title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                placeholder="Old Password" id="OldPassword" className="form-control"/>
        <input type="password" required={true}
                title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                placeholder="New Password" id="NewPassword" className="form-control"/>
        <input type="password" required={true}
                title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                placeholder="Confirm Password" id="ConfPassword" className="form-control"/>
        <button className="btn btn-success" type="submit">Submit</button>
    </form>
</div>
        );
    }
});

var EditInfo = React.createClass({
    getInitialState: function() {
        return {};
    },
    SendToServer: function(es) {
        es.preventDefault();
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        var data = {
            FirstName: $("#FirstNameEdit").val(),
            MiddleName: $("#MiddleNameEdit").val(),
            LastName: $("#LastNameEdit").val(),
            PhonePrivate: $("#PhonePrivateEdit").val(),
            PhoneWork: $("#PhoneWorkEdit").val(),
            Notes: $("#NotesEdit").val()
        };
        //console.log(data);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function (data) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            console.log(data);
        }).fail(function(ee) {
            alert(ee);
        });
    },
    componentDidMount: function() {
        console.log(this.props.url);
    },
    render: function() {
        return (
            <div>
    <form onSubmit={this.SendToServer}>
        <label htmlFor="FirstNameEdit">Enter First Name</label>
        <input type="text" placeholder={this.props.FirstName}
                id="FirstNameEdit" className="form-control"/>

        <label htmlFor="MiddleNameEdit">Enter Middle Name</label>
        <input type="text" placeholder={this.props.MiddleName}
                id="MiddleNameEdit" className="form-control"/>

        <label htmlFor="LastNameEdit">Enter Last Name</label>
        <input type="text" placeholder={this.props.LastName}
                id="LastNameEdit" className="form-control"/>

        <label htmlFor="PhonePrivateEdit">Enter your private phone</label>
        <input type="text" placeholder={this.props.PhonePrivate}
                id="PhonePrivateEdit" className="form-control"/>

        <label htmlFor="PhoneWorkEdit">Enter your work phone</label>
        <input type="text" placeholder={this.props.PhoneWork}
                id="PhoneWorkEdit" className="form-control"/>

        <label htmlFor="NotesEdit">Enter your note</label>
        <input type="text" placeholder={this.props.Notes}
                id="NotesEdit" className="form-control"/>
        <button className="btn btn-success" type="submit">Submit</button>
    </form>
</div>
        );
    }
});

var ImageUpload = React.createClass({
    getInitialState: function () {
        return {};

    },
    componentDidMount: function () {
        var url = this.props.url;
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        $("#dropForm").dropzone({
            url: url, headers: {
                'Authorization': "bearer " + token
            }
        }).on("success",()=> {
            React.unmountComponentAtNode(document.getElementById('Settings')); //TODO: Make this WORK!
        });
    },
    render: function () {
        return (
            <div>
<form id="dropForm" onSubmit={this.SendToServer} className="dropzone">
  <div className="fallback">
    <input name="file" type="file" multiple={true} />
  </div>
</form>

</div>
        );
}
});


var Info = React.createClass({
    loadFromServer: function() {
        var self = this;
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token,
                'Content-Type': "application/json"
            },
            type: "GET",
            url: this.props.url
        }).success(function(data) {
            self.setState({
                FirstName: data.FirstName,
                MiddleName: data.MiddleName,
                LastName: data.LastName,
                PositionInCompany: data.PositionInCompany,
                PhonePrivate: data.PhonePrivate,
                PhoneWork: data.PhoneWork,
                Notes: data.Notes,
                Boss: data.Boss,
                PathToPhoto: data.PathToPhoto,
                PathToTmbOfPhoto: data.PathToTmbOfPhoto,
                HolidayTimeStart: data.HolidayTimeStart,
                HolidayTimeEnd: data.HolidayTimeEnd
            });
        }).fail(function() {
            alert("Error");
        });
    },
    getInitialState: function() {
        return {
            data: [],
            c: false
        };
    },
    componentDidMount: function() {
        this.loadFromServer();
        console.log(this.props.url);
    },
    UploadImage: function() {
        if (this.state.c) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
       <ImageUpload url="api/Account/Upload"/>,
       document.getElementById("Settings")
);
            this.state.c = true;
        }
    },
    ChangePassword: function () {
        if (this.state.c) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
       <ChangePassword url="api/Account/ChangePassword"/>,
       document.getElementById("Settings")
        );
            this.state.c = true;
        }
    },
    EditInfo: function () {
        if (this.state.c) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
    <EditInfo FirstName={this.state.FirstName}
        MiddleName={this.state.MiddleName} 
        LastName={this.state.LastName} 
        PositionInCompany={this.state.PositionInCompany} 
        PhonePrivate={this.state.PhonePrivate} 
        PhoneWork={this.state.PhoneWork} 
        Notes={this.state.Notes} 
        url="api/Account/UpdateAllUserInfo"/>,
document.getElementById("Settings")
        );
            this.state.c = true;
        }

    },
    render: function() {
        return (
            <div>
                <section id="profileMenuHeader" className="bg-primary">
                    <div className="container">
                        <div className="row"> 
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary text-faded" />
                                <h2 className="section-heading">Hello in Your settings!</h2>
                                <hr className="light"/>
                             </div>
                        </div>
                    </div>
                </section>

                                <section id="profileMenuInfo">
                    <div className="container">
                        <div className="row"> 
                            <div className="col-lg-3 col-lg-offset-1 col-md-6 text-center">
                                <img src={this.state.PathToTmbOfPhoto} alt="ProfileImage" />
                             </div>
                             <div className="col-lg-3 col-md-6 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                                <p className="text-muted">Yours First Name is - {this.state.FirstName}</p>
                                <p className="text-muted">Yours Middle Name is - {this.state.MiddleName}</p>
                                <p className="text-muted">Yours Last Name is - {this.state.LastName}</p>
                                <p className="text-muted">Yours Position in company is - {this.state.PositionInCompany}</p>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                                <p className="text-muted">Yours Private phone is - {this.state.PhonePrivate}</p>
                                <p className="text-muted">Yours Work phone is - {this.state.PhoneWork}</p>
                                <p className="text-muted">Yours Note is - {this.state.Notes}</p>
                                <p className="text-muted">Yours Boss is - {this.state.Boss}</p>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                                <p className="text-muted">Yours holidays starts at - {this.state.HolidayTimeStart}</p>
                                <p className="text-muted">Yours holidays ends at - {this.state.HolidayTimeEnd}</p>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </section>

                <aside id="profileMenuEditions" className="bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <i className="fa fa-4x fa-diamond wow tada text-faded" />
                                <h2 className="section-heading">Here Your can change somethig!</h2>
                                <hr className="light" />
                        <ul>
                                    <li><a onClick={this.ChangePassword} href="#ChangePassword">Change password</a></li>
                                    <li><a onClick={this.EditInfo} href="#ChangePassword">Change info</a></li>
                                    <li><a onClick={this.UploadImage} href="#UploadImage">Upload Image</a></li>
                        </ul>
                            </div>
                            </div>
                        <div className="row">
                            <div id="Settings" className="col-lg-8 col-lg-offset-4"></div>
                        </div>
                        </div>
                </aside>
</div>
        );
    }
});