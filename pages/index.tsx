import MetaTags from 'components/MetaTags';
import Divider from 'components/Divider';

export default function Home() {
	return (
		<>
			<MetaTags />
			<section>
				<div id='content'>
					<h1>Cool Divider</h1>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut atque magnam voluptas
						facilis nulla modi suscipit at hic nemo est. Fugiat porro repellat eaque tempore ab!
						Similique quibusdam debitis mollitia.
					</p>
				</div>
				<Divider />
			</section>
			<section className='foreground'>
				<div id='content'>
					<h1>Cool Divider</h1>
					<p>
						Consequatur necessitatibus tempora nisi fuga, consectetur qui harum, soluta aliquam
						accusantium delectus veniam nihil amet voluptate repudiandae, explicabo quibusdam ipsum
						odio dolorem! Dolore reprehenderit esse id aliquam temporibus veritatis quam!
					</p>
				</div>
				<Divider foreground={true} />
			</section>
			<section>
				<div id='content'>
					<h1>Cool Divider</h1>
					<p>
						Iusto illo ipsa et nemo sit, velit corrupti perferendis accusantium voluptate, molestiae
						eveniet ex accusamus unde, non consequatur ducimus modi nesciunt rerum? Tempora iure
						quibusdam nemo adipisci. Rerum, ullam eveniet.
					</p>
				</div>
				<Divider />
			</section>
		</>
	);
}
