# Тестовое задание от Valantis

Задание выполнено на React.js. 

## Сложности, с которыми столкнулся

В связи с тем, что в полученных id с сервера могут встречаться дубликаты и при обращение к апи нельзя получить 
количество элементов, я решил получать все id с сервера при первой загрузке. Для более быстрой загрузки товаров 
на первой странице я сначала запрашиваю первые 60 id(с запасом, так как при запросе 50, могут прийти дубликаты 
с сервера и уникальных id будет меньше, чем требуется на странице) иотправляю запрос на первые 50 товаров, 
параллельно получая все остальные id с сервера. Таким образом, быстрее приходят товары с первой страницы и 
параллельно подгружается пагинация, тем самым улучшая пользовательский опыт.

Также есть вариант подгрузки id порционно, но таким образом увеличивается время загрузки каждой последующей страницы, 
так как при запросе id количество пришедших id не равно количеству уникальных id, а также нельзя отобразить пагинатор
без знания количества страниц, поэтому я решил, что мой способ решения данной задачи является самым оптимальным.


## Что я бы предложил для улучшения работы c API(за исключением удаления дубликатов на сервере)?

Получение товаров сразу, минуя получение идентификаторов и отправку их на сервер, так как по сути это не сильно требуется,
а также добавить возможность получить количество всех товаров. Таким образом, не будет требоваться получать все идентификаторы, 
но также можно будет свободны перемещаться со одной страницы на другую. Это уменьшит количество информации передаваемой 
между клиентом и сервером, а также улучшит поддерживаемость кода. 
