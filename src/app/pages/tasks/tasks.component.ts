import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom } from 'rxjs';
import 'devextreme/data/odata/store';
import { LoadOptions } from 'devextreme/data';


const GET_POSTS = gql`
  query {
    countries {
      phone
    }
  }
`;

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  loading: boolean = false;
  posts: any;
  page: number = 5;

  // url: string;

  dataSource: any;
  priority: any[] = [];
  // private querySubscription: Subscription;

  customDataSource: DataSource = new DataSource({});
  readonly allowedPageSizes = [5, 10, 20];
  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  constructor(private apollo: Apollo, private http: HttpClient) {
    this.getDataSource();

    // this.customDataSource = new DataSource({
    //   store: new CustomStore({
    //     key: 'ID',
    //     load: () => {
    //      return this.apollo
    //       .watchQuery<any>({
    //         query: GET_POSTS,
    //       })
    //       .valueChanges.subscribe(({ data, loading }) => {
    //         console.log(data);
            
    //       });
    //     }
    //   })
    // });

    // console.log(this.dataSource);
    
    // this.http.post('https://countries.trevorblades.com/', {
    //   query: `
    //   query {
    //     countries {
    //       phone
    //     }
    //   }
    //   `,
    // },
    //  {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .subscribe((result: any) => {
    //     console.log(result);
    //   });

    // this.querySubscription = this.apollo
    //   .watchQuery<any>({
    //     query: GET_POSTS,
    //   })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     console.log(data);
        
    //   });

    // this.dataSource = {
    //   store: {
    //     type: 'odata',
    //     key: 'Task_ID',
    //     url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
    //   },
    //   expand: 'ResponsibleEmployee',
    //   select: [
    //     'Task_ID',
    //     'Task_Subject',
    //     'Task_Start_Date',
    //     'Task_Due_Date',
    //     'Task_Status',
    //     'Task_Priority',
    //     'Task_Completion',
    //     'ResponsibleEmployee/Employee_Full_Name'
    //   ]
    // };
    // this.priority = [
    //   { name: 'High', value: 4 },
    //   { name: 'Urgent', value: 3 },
    //   { name: 'Normal', value: 2 },
    //   { name: 'Low', value: 1 }
    // ];
  }

  getDataSource() {
    // const isNotEmpty = (value: unknown) => value !== undefined && value !== null && value !== '';
    // console.log(isNotEmpty);
    
    this.dataSource = new DataSource({
        store: new CustomStore({
          key: 'id',
          load: (loadOptions: LoadOptions) => {
          //   let params: HttpParams = new HttpParams();

          //   [
          //     'filter',
          //     'group',
          //     'groupSummary',
          //     'parentIds',
          //     'requireGroupCount',
          //     'requireTotalCount',
          //     'searchExpr',
          //     'searchOperation',
          //     'searchValue',
          //     'select',
          //     'sort',
          //     'skip',
          //     'take',
          //     'totalSummary',
          //     'userData',
          // ].forEach(function (i) {
          //     const optionValue = loadOptions[i as keyof LoadOptions];
          //     if (i in loadOptions && isNotEmpty(optionValue)) {
          //         params = params.set(i, JSON.stringify(optionValue));
          //     }
          // });

            return lastValueFrom(
              this.http.post(
                'http://10.10.254.199:7171/graphql/',
                {
                  query: `
                    query {
                      companies(first: ${this.page}){
                          nodes{
                              id
                              name
                              imageUrl
                          }
                          pageInfo{
                              endCursor
                              hasNextPage
                          }
                          totalCount
                      }
                  }
                  `
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'CustomerId': '018c3e02-90e7-7089-b2bd-8767df775cf9'
                  },
                }
              )
            ).then((response: any) => {
              console.log(response);
              
            //   console.log({
            //     data: response?.data,
            //     totalCount: response?.data.companies.nodes.length,
            //     summary: response?.summary,
            //     groupCount: response?.groupCount,
            // });
        
              return {
                  data: response?.data.companies.nodes,
                  totalCount: response?.data.companies.nodes.length,
                  summary: this.allowedPageSizes,
                  groupCount: response?.groupCount,
              };
            })
          }
        }),


        // Coba

    });

  }

  handlePropertyChange(e: any) {
    console.log(e);

    
    switch (e.name) {
      case "paging":
        this.page = e.value;

        this.dataSource.reload();
        break;
    
      default:
        break;
    }
  }

}
