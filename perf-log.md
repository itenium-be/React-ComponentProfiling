Performance
===========

- First opened with 38 projects: 
- 2nd with 38: 
- 3rd with 76: 
- 4th with 74: 
- all opened: 
- renavigate with all opened: 



18 months // Total projects: 718


- First opened with 38 projects: 350ms
- 2nd with 38: 660ms
- 3rd with 76: 950ms
- 4th with 74: 1.2s
- all opened: 5s
- renavigate with all opened: 4.4s


holidays cache
--------------

- First opened with 38 projects: 350ms -> 220ms
- 2nd with 38: 660ms -> 320ms
- 3rd with 76: 950ms -> 540ms
- 4th with 74: 1.2s -> 680ms
- all opened: 5s -> 1.7s



projectMonths
-------------

First Commit:
Wait as long as possible to build the feature.
Try not to depend on rerendering when a filter of another month changes

Open 2nd: 130ms
Open 3rd: 154ms
Open 7th: 120ms


With 30ms the ConsultantCountFooter is taking a long time again 😀


Second Commit:
createSelector to cache the badge totals --> no rerender of badges anymore
createSelector to cache the projectMonths --> no rerender of the opened lists

Open 1st -> xth: 100-200ms


Third Commit:
Need to fix original functionality
--> text filters / switch validated
--> the top toolbar visibility


Fourth Commit:
The badges can be Memo'd?
Open lists maybe too?
--> to prevent rerender on route change!!


Now:
OpenedProjectMonthList
InvoiceEmail
ButtonComponent




Tooltips of Icons etc don't work --> remove the html?
