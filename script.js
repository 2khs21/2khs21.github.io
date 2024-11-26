// JSON 파일 로드 및 파일 목록 생성
fetch('files.json')
	.then((response) => response.json())
	.then((data) => {
		const content = document.getElementById('content');

		// 카테고리별로 섹션 생성
		for (const [category, files] of Object.entries(data)) {
			const section = document.createElement('section');
			section.innerHTML = `<h2>${category}</h2>`;
			const ul = document.createElement('ul');

			// 각 파일 이름에서 날짜와 제목 추출
			files.forEach((file) => {
				console.log(file);
				const { date, title } = parseFileName(file);
				const li = document.createElement('li');
				li.innerHTML = `<a href="post/${category}/${file}">${date}: ${title}</a>`;
				ul.appendChild(li);
			});

			section.appendChild(ul);
			content.appendChild(section);
		}
	})
	.catch((error) => console.error('Error loading files:', error));

// 파일 이름에서 날짜와 제목 추출
function parseFileName(fileName) {
	const [date, ...titleParts] = fileName.replace('.md', '').split('-');
	const title = titleParts.join(' ');
	return { date, title };
}
