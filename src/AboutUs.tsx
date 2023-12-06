import React, {useState} from 'react';
import Header from "./Components/Header";

const AboutUs = () => {

    const [light, setLight] = useState(false)
    const [light2, setLight2] = useState(false)

    const toggleLight = (setState:any) =>{
        setState(true)
        setTimeout(()=>{
            setState(false)
        }, 2000)
    }


    return (
        <div className="body">
        <Header />
            <div className="block">

                <div className="menu">
                    <a onClick={()=>toggleLight(setLight)} href="#aliquam">Aliquam</a>
                    <br/>
                    <br/>
                    <br/>

                    <a onClick={()=>toggleLight(setLight2)} href="#innulla">Aliquam in nulla</a>


                </div>
                <span id="myAnchor" className="text_Content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolor laboriosam odio omnis quaerat sequi similique. Accusamus accusantium atque commodi consequatur cupiditate deleniti eligendi error esse facere ipsam laudantium maxime odio quas, repellendus tempore vel voluptates! A, accusamus ad consequatur consequuntur cumque dolore dolorem eius eos et ex fugiat incidunt inventore ipsa ipsam itaque maiores nobis non possimus quasi qui quo quos repudiandae suscipit unde vel? Alias aspernatur assumenda cupiditate deleniti enim fugit, ipsam ipsum iste itaque iusto molestiae mollitia nemo optio quia rem repudiandae veniam! A adipisci aspernatur dicta eos incidunt laborum numquam odio possimus recusandae repudiandae. Delectus distinctio hic tenetur vero! Autem corporis delectus dignissimos dolores dolorum, error eum fugiat fugit illo labore laudantium maiores molestiae optio placeat quod recusandae suscipit ullam? Atque dignissimos exercitationem fugiat illum ipsam neque odit quam, ratione reprehenderit voluptates? At et fuga maxime, nisi rem sequi tempore. Aut incidunt laudantium minima reiciendis velit?<br/> <br/> <span
                    style={light?{background:"red"}:{background:"white"}} id="aliquam">Aliquam</span> commodi culpa cumque deserunt distinctio dolores dolorum earum eligendi ex, fugit impedit ipsam ipsum laboriosam magnam magni non nulla odit omnis quaerat quia quos, recusandae rerum, sapiente suscipit tempore totam vel! Aperiam aut dolorem earum error expedita facilis incidunt libero, minima modi molestiae nostrum pariatur quia saepe soluta, voluptatum? Architecto beatae consectetur corporis cum deleniti dicta earum error est et ipsa itaque laborum libero, nam necessitatibus neque nostrum odit perspiciatis praesentium quae quam quasi qui quia, quos, sint soluta vel veniam. <br/> <br/> <span  style={light2?{background:"red"}:{background:"white"}} id="innulla">Aliquam in nulla</span> quidem rem repellendus repudiandae unde velit. Accusantium aperiam aut esse fugiat impedit ipsa, magni molestiae mollitia nesciunt non perspiciatis quia quibusdam soluta unde vitae. Aliquam, aperiam beatae delectus deserunt dignissimos doloribus ea enim eos error exercitationem id labore magni nihil, numquam obcaecati odit perspiciatis possimus quae qui quo quod recusandae repudiandae sequi sint sunt suscipit vel vero voluptate voluptatibus voluptatum. A aliquam blanditiis culpa, cumque delectus dicta distinctio enim exercitationem fuga fugit iure iusto laudantium libero nulla odio omnis quam quia quo ratione rem repellat reprehenderit repudiandae tempore, totam ullam veritatis vero voluptatum. Aliquam amet, assumenda cupiditate dicta, dignissimos error, facilis in libero nemo officia perspiciatis quasi quis rem. A alias aperiam beatae deleniti ea eius enim eos ex fugiat iure neque odit, provident quaerat quasi quis ratione, soluta unde, velit veritatis voluptatem. Aperiam architecto asperiores beatae culpa debitis et, explicabo harum incidunt modi, molestias non pariatur quas tempora unde voluptatibus. Consequuntur doloremque, dolorum ipsam minima minus perspiciatis placeat quaerat, quidem quo reprehenderit sequi?</span>
            </div>

        </div>
    );
};

export default AboutUs;