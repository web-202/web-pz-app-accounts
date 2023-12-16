import React, {FC, useState} from 'react';
import Header from '../../components/Header/Header';
import './About.scss';

const About: FC = () => {
  const sections = [
    {
      id: 'whatIsLorem',
      header: 'What is Lorem Ipsum?',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequuntur eum illum impedit, magni\n' +
        '                  maiores\n' +
        '                  molestiae quia quisquam! Aperiam minus odio vel! Accusantium assumenda blanditiis doloribus illum iure\n' +
        '                  libero quis similique. Alias autem dignissimos distinctio ea eius eum fugiat itaque maiores nostrum\n' +
        '                  nulla\n' +
        '                  placeat possimus quaerat saepe sed sequi, temporibus voluptas. Blanditiis cum ducimus laboriosam nisi\n' +
        '                  quaerat? Adipisci alias aliquid at blanditiis culpa deleniti eligendi facere, iste nemo nihil odit optio\n' +
        '                  quaerat similique velit voluptatum. Alias aperiam consectetur cum deleniti eius, eligendi expedita,\n' +
        '                  explicabo fuga ipsum iste laudantium molestias neque obcaecati officiis placeat porro quasi repellat\n' +
        '                  rerum\n' +
        '                  sint suscipit temporibus veniam voluptatem voluptates. Adipisci architecto autem blanditiis consequatur,\n' +
        '                  dolor doloribus et impedit in ipsam mollitia quaerat quos repellat. Culpa illo quo sit. Accusantium ad\n' +
        '                  atque, blanditiis consectetur delectus eaque earum eius facilis labore laborum laudantium magni minima\n' +
        '                  molestiae molestias nam nemo neque numquam obcaecati odit quasi quis repellendus similique ullam unde ut\n' +
        '                  veniam voluptatum! Aperiam at autem blanditiis culpa cumque delectus deserunt dicta esse, eum facilis\n' +
        '                  hic\n' +
        '                  impedit labore laudantium minus necessitatibus nostrum omnis optio repellat sint tempore temporibus unde\n' +
        '                  voluptate. Accusamus aliquam aliquid ducimus excepturi explicabo id impedit iusto nam quos sequi tempore\n' +
        '                  ut,\n' +
        '                  velit vero. Asperiores beatae cupiditate dolorum ex illo itaque labore minima, molestias neque nesciunt,\n' +
        '                  numquam omnis optio perferendis praesentium quibusdam rem sed sit! Deleniti id in labore quibusdam\n' +
        '                  veniam.\n' +
        '                  Aspernatur atque blanditiis expedita in, natus quaerat quis quisquam voluptates? Ab accusamus amet\n' +
        '                  assumenda\n' +
        '                  atque cupiditate delectus doloremque esse excepturi exercitationem expedita harum impedit ipsum itaque,\n' +
        '                  laboriosam minus modi molestiae nemo nesciunt non nulla optio provident suscipit totam veritatis\n' +
        '                  voluptatum!\n' +
        '                  Accusamus aliquid autem expedita harum illum laudantium molestiae porro quae quibusdam soluta. Alias\n' +
        '                  asperiores consequatur cumque dolorum eius error excepturi facilis, fugiat harum id minus modi nihil\n' +
        '                  nobis\n' +
        '                  odio optio perspiciatis praesentium provident quae quisquam quo ratione repellat reprehenderit\n' +
        '                  repudiandae\n' +
        '                  rerum saepe sapiente sit sunt ullam veritatis vero? Ab animi aperiam asperiores aut commodi cupiditate\n' +
        '                  ex,\n' +
        '                  exercitationem laudantium magnam minus necessitatibus obcaecati, quibusdam quos ratione vero vitae\n' +
        '                  voluptas\n' +
        '                  voluptatum? Aliquam aut culpa ea molestias quaerat quod voluptates voluptatum! Accusantium blanditiis\n' +
        '                  cum\n' +
        '                  cupiditate, deleniti dolore dolorem dolores exercitationem facilis, hic illum in incidunt ipsa iste\n' +
        '                  natus\n' +
        '                  officiis possimus quae quaerat quia quo recusandae, rem repudiandae similique sint soluta temporibus. Ad\n' +
        '                  aspernatur assumenda culpa debitis doloribus eos fugiat hic id, ipsum itaque libero magnam nostrum nulla\n' +
        '                  numquam quaerat qui quidem quisquam quos sed totam ut voluptas voluptates voluptatibus. A blanditiis\n' +
        '                  commodi\n' +
        '                  cum dignissimos earum enim et ex facere, fugit ipsam ipsum iure maiores necessitatibus nemo neque\n' +
        '                  quaerat\n' +
        '                  quia totam ullam unde veritatis. Amet dignissimos ea eveniet facilis itaque modi nobis officiis, sed\n' +
        '                  sint\n' +
        '                  veritatis! Ab, commodi dicta eius eos iusto laudantium non officia sit! Adipisci architecto culpa dicta\n' +
        '                  dolores dolorum et eveniet ipsam ipsum labore libero, neque nulla praesentium quae ratione repellendus\n' +
        '                  temporibus voluptate. A at blanditiis corporis debitis, deserunt earum iusto magni molestiae provident\n' +
        '                  tenetur veniam voluptatem. Dolorum facilis harum provident quos temporibus. Asperiores autem blanditiis\n' +
        '                  consequatur id iure magnam magni praesentium ratione! Accusamus architecto, consectetur cum distinctio\n' +
        '                  eius'
    },
    {
      id: 'whyUseIt',
      header: 'Why do we use it?',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequuntur eum illum impedit, magni\n' +
        '                  maiores\n' +
        '                  molestiae quia quisquam! Aperiam minus odio vel! Accusantium assumenda blanditiis doloribus illum iure\n' +
        '                  libero quis similique. Alias autem dignissimos distinctio ea eius eum fugiat itaque maiores nostrum\n' +
        '                  nulla\n' +
        '                  placeat possimus quaerat saepe sed sequi, temporibus voluptas. Blanditiis cum ducimus laboriosam nisi\n' +
        '                  quaerat? Adipisci alias aliquid at blanditiis culpa deleniti eligendi facere, iste nemo nihil odit optio\n' +
        '                  quaerat similique velit voluptatum. Alias aperiam consectetur cum deleniti eius, eligendi expedita,\n' +
        '                  explicabo fuga ipsum iste laudantium molestias neque obcaecati officiis placeat porro quasi repellat\n' +
        '                  rerum\n' +
        '                  sint suscipit temporibus veniam voluptatem voluptates. Adipisci architecto autem blanditiis consequatur,\n' +
        '                  dolor doloribus et impedit in ipsam mollitia quaerat quos repellat. Culpa illo quo sit. Accusantium ad\n' +
        '                  atque, blanditiis consectetur delectus eaque earum eius facilis labore laborum laudantium magni minima\n' +
        '                  molestiae molestias nam nemo neque numquam obcaecati odit quasi quis repellendus similique ullam unde ut\n' +
        '                  veniam voluptatum! Aperiam at autem blanditiis culpa cumque delectus deserunt dicta esse, eum facilis\n' +
        '                  hic\n' +
        '                  impedit labore laudantium minus necessitatibus nostrum omnis optio repellat sint tempore temporibus unde\n' +
        '                  voluptate. Accusamus aliquam aliquid ducimus excepturi explicabo id impedit iusto nam quos sequi tempore\n' +
        '                  ut,\n' +
        '                  velit vero. Asperiores beatae cupiditate dolorum ex illo itaque labore minima, molestias neque nesciunt,\n' +
        '                  numquam omnis optio perferendis praesentium quibusdam rem sed sit! Deleniti id in labore quibusdam\n' +
        '                  veniam.\n' +
        '                  Aspernatur atque blanditiis expedita in, natus quaerat quis quisquam voluptates? Ab accusamus amet\n' +
        '                  assumenda\n' +
        '                  atque cupiditate delectus doloremque esse excepturi exercitationem expedita harum impedit ipsum itaque,\n' +
        '                  laboriosam minus modi molestiae nemo nesciunt non nulla optio provident suscipit totam veritatis\n' +
        '                  voluptatum!\n' +
        '                  Accusamus aliquid autem expedita harum illum laudantium molestiae porro quae quibusdam soluta. Alias\n' +
        '                  asperiores consequatur cumque dolorum eius error excepturi facilis, fugiat harum id minus modi nihil\n' +
        '                  nobis\n' +
        '                  odio optio perspiciatis praesentium provident quae quisquam quo ratione repellat reprehenderit\n' +
        '                  repudiandae\n' +
        '                  rerum saepe sapiente sit sunt ullam veritatis vero? Ab animi aperiam asperiores aut commodi cupiditate\n' +
        '                  ex,\n' +
        '                  exercitationem laudantium magnam minus necessitatibus obcaecati, quibusdam quos ratione vero vitae\n' +
        '                  voluptas\n' +
        '                  voluptatum? Aliquam aut culpa ea molestias quaerat quod voluptates voluptatum! Accusantium blanditiis\n' +
        '                  cum\n' +
        '                  cupiditate, deleniti dolore dolorem dolores exercitationem facilis, hic illum in incidunt ipsa iste\n' +
        '                  natus\n' +
        '                  officiis possimus quae quaerat quia quo recusandae, rem repudiandae similique sint soluta temporibus. Ad\n' +
        '                  aspernatur assumenda culpa debitis doloribus eos fugiat hic id, ipsum itaque libero magnam nostrum nulla\n' +
        '                  numquam quaerat qui quidem quisquam quos sed totam ut voluptas voluptates voluptatibus. A blanditiis\n' +
        '                  commodi\n' +
        '                  cum dignissimos earum enim et ex facere, fugit ipsam ipsum iure maiores necessitatibus nemo neque\n' +
        '                  quaerat\n' +
        '                  quia totam ullam unde veritatis. Amet dignissimos ea eveniet facilis itaque modi nobis officiis, sed\n' +
        '                  sint\n' +
        '                  veritatis! Ab, commodi dicta eius eos iusto laudantium non officia sit! Adipisci architecto culpa dicta\n' +
        '                  dolores dolorum et eveniet ipsam ipsum labore libero, neque nulla praesentium quae ratione repellendus\n' +
        '                  temporibus voluptate. A at blanditiis corporis debitis, deserunt earum iusto magni molestiae provident\n' +
        '                  tenetur veniam voluptatem. Dolorum facilis harum provident quos temporibus. Asperiores autem blanditiis\n' +
        '                  consequatur id iure magnam magni praesentium ratione! Accusamus architecto, consectetur cum distinctio\n' +
        '                  eius'
    },
    {
      id: 'whereItComesFrom',
      header: 'Where does it come from?',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequuntur eum illum impedit, magni\n' +
        '                  maiores\n' +
        '                  molestiae quia quisquam! Aperiam minus odio vel! Accusantium assumenda blanditiis doloribus illum iure\n' +
        '                  libero quis similique. Alias autem dignissimos distinctio ea eius eum fugiat itaque maiores nostrum\n' +
        '                  nulla\n' +
        '                  placeat possimus quaerat saepe sed sequi, temporibus voluptas. Blanditiis cum ducimus laboriosam nisi\n' +
        '                  quaerat? Adipisci alias aliquid at blanditiis culpa deleniti eligendi facere, iste nemo nihil odit optio\n' +
        '                  quaerat similique velit voluptatum. Alias aperiam consectetur cum deleniti eius, eligendi expedita,\n' +
        '                  explicabo fuga ipsum iste laudantium molestias neque obcaecati officiis placeat porro quasi repellat\n' +
        '                  rerum\n' +
        '                  sint suscipit temporibus veniam voluptatem voluptates. Adipisci architecto autem blanditiis consequatur,\n' +
        '                  dolor doloribus et impedit in ipsam mollitia quaerat quos repellat. Culpa illo quo sit. Accusantium ad\n' +
        '                  atque, blanditiis consectetur delectus eaque earum eius facilis labore laborum laudantium magni minima\n' +
        '                  molestiae molestias nam nemo neque numquam obcaecati odit quasi quis repellendus similique ullam unde ut\n' +
        '                  veniam voluptatum! Aperiam at autem blanditiis culpa cumque delectus deserunt dicta esse, eum facilis\n' +
        '                  hic\n' +
        '                  impedit labore laudantium minus necessitatibus nostrum omnis optio repellat sint tempore temporibus unde\n' +
        '                  voluptate. Accusamus aliquam aliquid ducimus excepturi explicabo id impedit iusto nam quos sequi tempore\n' +
        '                  ut,\n' +
        '                  velit vero. Asperiores beatae cupiditate dolorum ex illo itaque labore minima, molestias neque nesciunt,\n' +
        '                  numquam omnis optio perferendis praesentium quibusdam rem sed sit! Deleniti id in labore quibusdam\n' +
        '                  veniam.\n' +
        '                  Aspernatur atque blanditiis expedita in, natus quaerat quis quisquam voluptates? Ab accusamus amet\n' +
        '                  assumenda\n' +
        '                  atque cupiditate delectus doloremque esse excepturi exercitationem expedita harum impedit ipsum itaque,\n' +
        '                  laboriosam minus modi molestiae nemo nesciunt non nulla optio provident suscipit totam veritatis\n' +
        '                  voluptatum!\n' +
        '                  Accusamus aliquid autem expedita harum illum laudantium molestiae porro quae quibusdam soluta. Alias\n' +
        '                  asperiores consequatur cumque dolorum eius error excepturi facilis, fugiat harum id minus modi nihil\n' +
        '                  nobis\n' +
        '                  odio optio perspiciatis praesentium provident quae quisquam quo ratione repellat reprehenderit\n' +
        '                  repudiandae\n' +
        '                  rerum saepe sapiente sit sunt ullam veritatis vero? Ab animi aperiam asperiores aut commodi cupiditate\n' +
        '                  ex,\n' +
        '                  exercitationem laudantium magnam minus necessitatibus obcaecati, quibusdam quos ratione vero vitae\n' +
        '                  voluptas\n' +
        '                  voluptatum? Aliquam aut culpa ea molestias quaerat quod voluptates voluptatum! Accusantium blanditiis\n' +
        '                  cum\n' +
        '                  cupiditate, deleniti dolore dolorem dolores exercitationem facilis, hic illum in incidunt ipsa iste\n' +
        '                  natus\n' +
        '                  officiis possimus quae quaerat quia quo recusandae, rem repudiandae similique sint soluta temporibus. Ad\n' +
        '                  aspernatur assumenda culpa debitis doloribus eos fugiat hic id, ipsum itaque libero magnam nostrum nulla\n' +
        '                  numquam quaerat qui quidem quisquam quos sed totam ut voluptas voluptates voluptatibus. A blanditiis\n' +
        '                  commodi\n' +
        '                  cum dignissimos earum enim et ex facere, fugit ipsam ipsum iure maiores necessitatibus nemo neque\n' +
        '                  quaerat\n' +
        '                  quia totam ullam unde veritatis. Amet dignissimos ea eveniet facilis itaque modi nobis officiis, sed\n' +
        '                  sint\n' +
        '                  veritatis! Ab, commodi dicta eius eos iusto laudantium non officia sit! Adipisci architecto culpa dicta\n' +
        '                  dolores dolorum et eveniet ipsam ipsum labore libero, neque nulla praesentium quae ratione repellendus\n' +
        '                  temporibus voluptate. A at blanditiis corporis debitis, deserunt earum iusto magni molestiae provident\n' +
        '                  tenetur veniam voluptatem. Dolorum facilis harum provident quos temporibus. Asperiores autem blanditiis\n' +
        '                  consequatur id iure magnam magni praesentium ratione! Accusamus architecto, consectetur cum distinctio\n' +
        '                  eius'
    },
  ];

  const [selectedSection, setSelectedSection] = useState(sections[0].id);
  return (
    <>
      <Header currentPage={'about'}/>
      <div className="about-wrapper">
        <div className="about-us-container">
          <div className="sections">
            <ul>
              {sections.map((section) => (
                <li
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={selectedSection === section.id ? 'selected' : ''}
                >
                  <a href={`#${section.id}`}>{section.header}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content">

            {sections.map((section) => (
              <div key={section.id} id={section.id} className={selectedSection === section.id ? 'visible' : 'hidden'}>
                <h1>{section.header}</h1>
                <p>{section.title}</p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  )
    ;
};

export default About;
