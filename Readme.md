# jQuery any click count detect

Плагин позволяет отлавливать любое число кликов на элементе. 
Я не смог найти ни один плагин тройного клика, который работает с делегированием событий. А также позволят отлавливать более 3 кликов. В результате чего появился этот небольшой плагин.

Плагин предоставляет метод .anyClick() для библиотеке jquery.

#### Параметры
Плагин принимает 1 необязательный параметр в виде объекта с ключами:

**maxCount** : Number [default: 3] - максимальное число кликов. Клики свыше будут вызывать событие с максимальным числом.

**eventName** : String [default: 'clickCount'] - имя события, который выкидывается на элементе

**time** : Number [default: 300] - время в мс, которое ожидается перед тем как сработает событие. Позволяте регулировать интервал между кликами.

**delegate** String [default: null] - селектор для делегирования

#### Пример

Вызов плагина на наборе элементов:
`````javascript
$('button').anyClick({
	maxCount: 4,
	eventName: 'any_click',
	time: 300
});

$(document)
	.on('any_click.3', 'button', tripleClickHandler)
	.on('any_click.4', 'button', doubleClickHandler);
`````

Вызов через делегирование на элементе:
`````javascript
$(document).anyClick({
	maxCount: 4,
	delegate: 'button'
});

$(document)
	.on('clickCount.3', 'button', tripleClickHandler)
	.on('clickCount.2', 'button', doubleClickHandler)
	.on('clickCount.4', 'button', fourClickHandler);
`````