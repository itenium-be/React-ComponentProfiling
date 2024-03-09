Performance Talk - Live Coding
==============================

# Not on the menu

## Virtualization

- [bvaughn/react-virtualized](https://github.com/bvaughn/react-virtualized): React components for efficiently rendering large lists and tabular data (⭐ 26k)
- [bvaughn/react-window](https://github.com/bvaughn/react-window): React components for efficiently rendering large lists and tabular data (⭐ 15k)
- [TanStack/virtual](https://github.com/TanStack/virtual): 🤖 Headless UI for Virtualizing Large Element Lists in JS/TS, React, Solid, Vue and Svelte (⭐ 5k)


## Infinite Scroll

- [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component): An awesome Infinite Scroll component in react. (⭐ 3k)
- [react-infinite-scroller](https://github.com/danbovey/react-infinite-scroller): ⏬ Infinite scroll component for React in ES6 (⭐ 3k)
- [react-infinite-scroll-hook](https://github.com/onderonur/react-infinite-scroll-hook): React hook for creating infinite scroll components. (⭐ 500)




# InvoicesList

## WorkedDays calculated holidays

File: `src/components/invoice/models/InvoiceModel.ts` :: `calculateDaysWorked`.  
Remove adding `workDaysInMonth`.


### date-holidays vs @itenium/date-holidays-be

File: `frontend/src/actions/holidays.ts`

Remember: with caching comes cache invalidation  
There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton  
(and off by one errors.)  
But luckily for me, past Belgian holidays are literally never going to change!  


```ts
import { isHoliday } from '@itenium/date-holidays-be';

type WorkDaysMonthCache = {[month: string]: number};

class HolidaysService {
  cache: WorkDaysMonthCache = {};

  /** Returns the number of workdays in the month */
  get(month: moment.Moment): number {
    const monthKey = month.format('YYYY-MM');
    if (!this.cache[monthKey])
      this.cache[monthKey] = getWorkDaysInMonth(month);

    return this.cache[monthKey]
  }
}

export function getWorkDaysInMonth(momentInst: moment.Moment): number {
  const curMonth = momentInst.month();

  const date = new Date(momentInst.year(), curMonth, 1);
  const result: Date[] = [];
  while (date.getMonth() === curMonth) {
    // date.getDay = index of ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      if (!isHoliday(date)) {
        result.push(date);
      }
    }
    date.setDate(date.getDate() + 1);
  }
  return result.length;
}
```


## Resolving the FullProjectMonth for all Invoices

File: `src/components/hooks/useProjects.tsx` :: `useProjectMonthFromInvoice`

```ts
export function useProjectMonthFromInvoice(invoiceId: string): FullProjectMonthModel | undefined {
  const fullProjectMonth = useSelector((state: ConfacState) => {
    const invoice = state.invoices.find(x => x._id === invoiceId);
    if (!invoice?.projectMonth?.projectMonthId) {
      return undefined;
    }

    const projectMonth = state.projectsMonth.find(x => x._id === invoice?.projectMonth?.projectMonthId);
    if (!projectMonth) {
      return undefined;
    }

    return mapToProjectMonth(state, projectMonth as ProjectMonthModel, invoice);
  });

  return fullProjectMonth ?? undefined;
}
```


## EnhanceWithClaim

File: `src/components/users/authService.ts`

```ts
  _jwt = '';
  _token: JwtModel | null = null;
  _claims: Claim[] = [];

  authenticated(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this._jwt = jwt;
    this._token = parseJwt(jwt);

    const user = this._token?.data;
    if (user) {
      this._claims = getRoles()
        .filter(x => (user.roles || []).includes(x.name))
        .map(x => x.claims)
        .flat();

    } else {
      this._claims = [];
    }
  }
```



# ProjectMonthsList

## Incorrect Redux Selector (Filter: OpenProjectMonths)
## Caching of calculation of FullProjectMonths

RESELECT  
A library for creating memoized "selector" functions. Commonly used with Redux.  
Comes with @reduxjs/toolkit

MEMOIZE  
To store the result of a computation so that it can be subsequently retrieved without repeating the computation.




File: `src/components/project/project-month-list/open-list/OpenedProjectMonthsList.tsx`

```ts
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppFilters, patchProjectsMonth } from '../../../../actions';
import { projectMonthFeature, ProjectMonthFeatureBuilderConfig } from '../../models/getProjectMonthFeature';
import { Features } from '../../../controls/feature/feature-models';
import { OpenedProjectsMonthsListToolbar } from './OpenedProjectsMonthsListToolbar';
import { List } from '../../../controls/table/List';
import { createFullProjectMonthsSelector } from '../createFullProjectMonthsSelector';
import { ConfacState } from '../../../../reducers/app-state';
import { createSelector } from 'reselect';
import { ProjectMonthListFilters } from '../../../controls/table/table-models';


type OpenedProjectMonthsListProps = {
  month: string;
};

const selectProjectMonthsFilters = (state: ConfacState) => state.app.filters.projectMonths;


type FiltersModel = Omit<ProjectMonthListFilters, 'projectMonths'>;


const createFiltersSelector = () => createSelector(
  selectProjectMonthsFilters,
  (filters) => {
    const safeFilters: FiltersModel = {
      ...filters,
      openMonths: {},
    }
    return safeFilters;
  }, {
    // New in 4.1: Pass options through to the built-in `defaultMemoize` function
    memoizeOptions: {
      // TODO: need to update for new filters here! use deep-equal instead.
      // --> or better, the feature has the filter method there!
      equalityCheck: (a: FiltersModel, b: FiltersModel) => a.freeText === b.freeText && a.unverifiedOnly === b.unverifiedOnly,
      // maxSize: 10,
      // resultEqualityCheck: shallowEqual
    }
  }
);



/** A full open ProjectMonth with header + table */
export const OpenedProjectMonthsList = ({ month }: OpenedProjectMonthsListProps) => {
  const dispatch = useDispatch();
  const selectProjectMonths = useMemo(createFullProjectMonthsSelector, []);
  const projectMonths = useSelector((state) => selectProjectMonths(state, month));
  const selectFilters = useMemo(createFiltersSelector, []);
  const filters = useSelector((state: ConfacState) => selectFilters(state));

  const config: ProjectMonthFeatureBuilderConfig = {
    data: projectMonths,
    save: m => dispatch(patchProjectsMonth(m.details) as any),
    filters: filters,
    setFilters: f => dispatch(updateAppFilters(Features.projectMonths, f)),
  };

  const feature = projectMonthFeature(config);
  if (!feature.list.data.length || !feature.list.filter) {
    return null;
  }

  return (
    <>
      <OpenedProjectsMonthsListToolbar feature={feature} />
      <List feature={feature} />
      <hr className="list-separator" />
    </>
  );
};
```


### createFullProjectMonthsSelector

```ts
import { createSelector } from 'reselect'
import moment from 'moment';
import { ConfacState } from '../../../reducers/app-state';
import { FullProjectMonthModel } from '../models/FullProjectMonthModel';
import { ProjectMonthModel } from '../models/ProjectMonthModel';
import InvoiceModel from '../../invoice/models/InvoiceModel';
import { IProjectModel } from '../models/IProjectModel';
import { ClientModel } from '../../client/models/ClientModels';
import { ConsultantModel } from '../../consultant/models/ConsultantModel';
import { mapToProjectMonth } from '../../hooks/useProjects';


type ProjectMonthResolverState = {
  projectsMonth: ProjectMonthModel[];
  invoices: InvoiceModel[];
  projects: IProjectModel[];
  clients: ClientModel[];
  consultants: ConsultantModel[];
}

const selectProjectMonths = (state: ConfacState) => state.projectsMonth;
const selectProjects = (state: ConfacState) => state.projects;
const selectConsultants = (state: ConfacState) => state.consultants;
const selectClients = (state: ConfacState) => state.clients;
const selectInvoices = (state: ConfacState) => state.invoices;


export const createFullProjectMonthsSelector = () => createSelector(
  [
    selectProjectMonths,
    selectProjects,
    selectConsultants,
    selectClients,
    selectInvoices,
    (_, month: string) => month
  ],
  (projectsMonth, projects, consultants, clients, invoices, month) => {
    const context: ProjectMonthResolverState = {
      projectsMonth, projects, consultants, clients, invoices
    }
    return projectsMonth
      .filter(x => x.month.isSame(moment(month), 'month'))
      .map(x => mapToProjectMonth(context, x))
      .filter(x => x !== null) as FullProjectMonthModel[];
  }
);
```


### ProjectMonthListCollapsed


```ts
import React, { useMemo } from 'react';
import moment from 'moment';
import { displayMonthWithYear } from "../project-month-utils";
import {t} from '../../../utils';
import { TimesheetBadge } from './badges/TimesheetBadge';
import { InboundBadge } from './badges/InboundBadge';
import { OutboundBadge } from './badges/OutboundBadge';
import { createProjectMonthBadgesSelector } from './createProjectMonthBadgesSelector';
import { useSelector } from 'react-redux';
import { ToggleProjectMonthButton } from '../ToggleProjectMonthButton';


const VerifiedBadge = (
  <span className="badge rounded-pill text-white bg-success">
    <i className="fa fa-coins fa-1x" />
    {t('projectMonth.list.allVerifiedBadge')}
  </span>
);


/** ProjectMonth when the list is not visible, displaying badges */
export const ProjectMonthListCollapsed = ({month}: {month: string}) => {
  const selectProjectMonthBadges = useMemo(createProjectMonthBadgesSelector, []);
  const totals = useSelector((state) => selectProjectMonthBadges(state, month));

  const allVerified = totals.verified === totals.total;
  const hasTimesheetPending = totals.timesheetPending.length !== 0;
  const hasInboundPending = totals.inboundPending.length !== 0;

  return (
    <>
      <h2 className="list-projectMonths-collapsed">
        <ToggleProjectMonthButton month={month} toggleOpen={true} />
        <span className="month">{displayMonthWithYear(moment(month))}</span>

        <span className="separate">
          {allVerified ? VerifiedBadge : (
            <>
              <TimesheetBadge totals={totals} pending={hasTimesheetPending} />
              <InboundBadge totals={totals} pending={hasInboundPending} />
              <OutboundBadge totals={totals} />
            </>
          )}
        </span>
      </h2>
    </>
  );
};
```


### createProjectMonthBadgesSelector

```ts
import { createSelector } from 'reselect'
import { ProjectMonthBadgeTotals } from './ProjectMonthBadgeTotals';
import { ConfacState } from '../../../../reducers/app-state';
import { shallowEqual } from 'react-redux';


const selectProjectsMonth = (state: ConfacState) => state.projectsMonth;
const selectProjects = (state: ConfacState) => state.projects;
const selectConsultants = (state: ConfacState) => state.consultants;
const selectClients = (state: ConfacState) => state.clients;


const selectAllData = createSelector(
  [selectProjectsMonth, selectProjects, selectConsultants, selectClients],
  (projectsMonth, projects, consultants, clients) => ({
    projectsMonth, projects, consultants, clients
  }), {
    memoizeOptions: { resultEqualityCheck: shallowEqual }
  }
);


/** Calculates the totals needed for rendering the timesheet/inbound/outbound badges for one projectMonth */
export const createProjectMonthBadgesSelector = () => createSelector(
  [
    selectAllData,
    (_, month: string) => month
  ],
  ({projectsMonth, projects, consultants, clients}, month) => {
    const projectMonths = projectsMonth
      .filter(x => x.month.isSame(month, 'month') && x.verified !== 'forced')
      .map(projectMonth => {
        const project = projects.find(x => x._id === projectMonth.projectId);
        const consultant = project?.consultantId && consultants.find(x => x._id === project?.consultantId);
        const client = clients.find(x => x._id === project?.client?.clientId);
        const clientName = client ? ` (${client.name})` : '';
        const result = {
          verified: projectMonth.verified,
          timesheet: projectMonth.timesheet,
          inbound: projectMonth.inbound,
          hasInboundInvoice: project?.projectMonthConfig?.inboundInvoice || false,
          consultant: consultant && `${consultant.firstName} ${consultant.name}${clientName}`
        };
        return result;
      });

    const mapToConsultantNames = (arr: any[]) => arr
      .map(x => x.consultant)
      .filter((val, index, arr) => arr.indexOf(val) === index)
      .join('<br>');

    const timesheetPending = projectMonths.filter(x => !x.timesheet.validated);
    const withInbound = projectMonths.filter(x => x.hasInboundInvoice);
    const inboundNew = withInbound.filter(x => x.inbound.status === 'new');
    const inboundValidated = withInbound.filter(x => x.inbound.status === 'validated');
    const inboundPaid = withInbound.filter(x => x.inbound.status === 'paid');

    const totals: ProjectMonthBadgeTotals = {
      total: projectMonths.length,
      verified: projectMonths.filter(x => x.verified).length,
      unverified: mapToConsultantNames(projectMonths.filter(x => !x.verified)),
      timesheetPending: mapToConsultantNames(timesheetPending),
      timesheetPendingCount: timesheetPending.length,
      inboundPending: mapToConsultantNames(withInbound.filter(x => x.inbound.status !== 'paid')),
      inboundNew: mapToConsultantNames(inboundNew),
      inboundNewCount: inboundNew.length,
      inboundValidated: mapToConsultantNames(inboundValidated),
      inboundValidatedCount: inboundValidated.length,
      inboundPaid: mapToConsultantNames(inboundPaid),
      inboundPaidCount: inboundPaid.length,
    };
    return totals;
  }
);
```




### OpenOrClosedProjectMonthsList

```ts
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ConfacState } from '../../../reducers/app-state';
import { ProjectMonthListCollapsed } from './closed-list/ProjectMonthListCollapsed';
import { OpenedProjectMonthsList } from './open-list/OpenedProjectMonthsList';

type OpenOrClosedProjectMonthsListProps = {
  /** Format: YYYY-MM */
  month: string;
};


const ProjectMonthListCollapsedMemo = memo(({ month }: {month: string}) => {
  // console.log(`memo rendered ${month}`, new Date().toLocaleTimeString());
  return <ProjectMonthListCollapsed month={month} />;
});


export const OpenOrClosedProjectMonthsList = ({ month }: OpenOrClosedProjectMonthsListProps) => {
  const isOpen = useSelector((state: ConfacState) => state.app.filters.projectMonths.openMonths[month]);
  if (isOpen) {
    return <OpenedProjectMonthsList month={month} />;
  }

  return <ProjectMonthListCollapsedMemo month={month} />;
};
```
