"use strict"

document.addEventListener("DOMContentLoaded", () => {

	// Tabs
	const tabs = document.querySelectorAll(".tabheader__item");
	const tabContent = document.querySelectorAll(".tabcontent");
	const tabsParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabContent.forEach(item => {
			item.style.display = "none";
		});

		tabs.forEach(function (item) {
			item.classList.remove('tabheader__item_active')
		});
	}
	function showTabContent(i = 0) {
		tabContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active')
	}

	hideTabContent()
	showTabContent()

	tabsParent.addEventListener('click', (event) => {
		const target = event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent()
					showTabContent(i)
				}
			});
		}
	});
	// Timer
	const deadline = "2023-03-23";
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor((t / (1000 * 60 * 60) % 24));
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = document.querySelector('#days');
		const hours = document.querySelector('#hours');
		const minutes = document.querySelector('#minutes');
		const seconds = document.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const t = getTimeRemaining(endtime)

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval)
			}
		}
	}
	setClock('.timer', deadline)

	//modal

	const modalTrigger = document.querySelectorAll('[data-modal-open]');
	const modal = document.querySelector('.modal');
	const modalClose = document.querySelector('[data-modal-close]');
	function showModal() {
		modal.style.display = 'block';
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerID)
	}
	function closeModal() {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto';
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', showModal)
	})


	modalClose.addEventListener('click', closeModal)

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.style.display = 'none';
			document.body.style.overflow = 'auto'
		}
	})
	document.addEventListener('keydown', (event) => {
		if (event.code == "Escape" && modal.style.display == 'block') {
			modal.style.display = 'none';
			document.body.style.overflow = 'auto'
		}
	})

	// МОДИФИКАЦИЯ МОДАЛЬНОГО ОКНА  
	const modalTimerID = setTimeout(showModal, 60000)

	// window.addEventListener('scroll', () => {
	// 	if(window.pageYOffset + document.documentElement)
	// })

	function showModalByScroll(){
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
			showModal()
			window.removeEventListener('scroll',showModalByScroll)
		}
	}

	window.addEventListener('scroll',showModalByScroll )
	







});
