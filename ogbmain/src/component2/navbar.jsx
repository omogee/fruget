import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
         <div>
             <nav>
                 <div className="row">
                     <div className="col-2"></div>
                     <div className="col-6"></div>
                     <div className="col-4"></div>
                 </div>
             </nav>
         </div>
         );
    }
}
 
export default Navbar;