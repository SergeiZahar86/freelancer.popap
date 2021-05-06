const popupLinks = document.querySelectorAll('.popup-link');               // получаем все ссылки с классом '.popup-link' при
// клике на которые будет открываться попап

const body = document.querySelector('body');                              // получаем боди для обездвиживания его
const lockPadding = document.querySelectorAll(".lock-padding");           // для добавления правого пэдинга
let unlock = true;                                                                // флаг, false - в течении времени закрытия (800 мс)
const timeout = 800;                                                              // должна быть равна длине анимации


if (popupLinks.length > 0) // цепляем на все ссылки, которые открывают попапы, обр. событий
{
	for (let index = 0; index < popupLinks.length; index++)
	{
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e)
		{
			const popupName = popupLink.getAttribute('href')
				.replace('#', '');                             // получаем имя попапа
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);                                                 // открываем попап
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');      // все объекты для закрытия попапов
if (popupCloseIcon.length > 0)
{
	for (let index = 0; index < popupCloseIcon.length; index++)
	{
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e)
		{
			popupClose(el.closest('.popup'));                          // ищем родителя с классом '.popup' для кнопки закрытия
			e.preventDefault();
		});
	}
}


function popupOpen(curentPopup)  // открытие попапа
{
	if (curentPopup && unlock)
	{
		const popupActive = document.querySelector('.popup.open');   // находим уже открытые попапы
		if (popupActive)                                                     // если они существуют
		{
			popupClose(popupActive, false);                          // закрываем их
		} else
		{
			bodyLock();                                                      // или же убираем прокрутку у боди
		}
		curentPopup.classList.add('open');                                   // добавляем новому попапу класс 'open'
		curentPopup.addEventListener("click", function (e)                   // цепляем обработку события
		{
			if (!e.target.closest('.popup__content'))                 // для всего что за пределами '.popup__content'
			{
				popupClose(e.target.closest('.popup'));               // закрываем попап
			}
		});
	}
}


function popupClose(popupActive, doUnlock = true)                    // функция закрытия попапа с колбэком установки doUnlock
{
	if (unlock)                                                              // защищает от двойного нажатия
	{
		popupActive.classList.remove('open');                          // убираес класс 'open' у попапа
		if (doUnlock)
		{
			bodyUnLock();                                                    // убираем прокрутку у боди
		}
	}
}


function bodyLock()  // убираем прокрутку у боди
{
	const lockPaddingValue =
		window.innerWidth - document.querySelector('.wrapper')
			.offsetWidth + 'px';

	if (lockPadding.length > 0)
	{
		for (let index = 0; index < lockPadding.length; index++)
		{
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function ()
	{
		unlock = true;
	}, timeout);
}

function bodyUnLock()
{
	setTimeout(function ()
	{
		if (lockPadding.length > 0)
		{
			for (let index = 0; index < lockPadding.length; index++)
			{
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function ()
	{
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e)
{
	if (e.which === 27)
	{
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function ()
{
	// проверяем поддержку
	if (!Element.prototype.closest)
	{
		// реализуем
		Element.prototype.closest = function (css)
		{
			var node = this;
			while (node)
			{
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function ()
{
	// проверяем поддержку
	if (!Element.prototype.matches)
	{
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
