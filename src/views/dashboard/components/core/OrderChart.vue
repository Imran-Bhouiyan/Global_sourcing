<template>
  <div>
    <!-- width="385" -->
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="seriedemo"
      width="380"
    ></apexchart>
  </div>
</template>


<script>
export default {
  data() {
    return {
      completed:0,
      processing:0,
      cancelled:0,
      seriesob:[],


      series: [],
      seriedemo:[30,40,30],
      chartOptions: {
        chart: {
          width: 280,
          type: "pie",
          offsetX: 60,
        },
        labels: ["Completed", "Processing", "Cancelled"],
        colors: ["#816BFF", "#13C9F2", "#F94B4B"],
        responsive: [
          {
            breakpoint: 1500,
            options: {
              chart: {
                width: '100%',
                height: '250px',
                offsetX: 0
              },
              legend: {
                // position: "bottom",
                show: false,
              },
            },
          },
          {
          breakpoint: 1700,
          options: {
            chart: {
              width: '380px',
              height: '250px',
              offsetX : 0
            },
            legend: {
              // position: "top",
              show : true,
            },
          },
        },
        ],
        legend: {
          position: "left",
          offsetY: 25,
          offsetX: -30,
          height: 630,
          itemMargin: {
            vertical: 20,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
      },
    };
  },
 methods: {
   getorder(){
     axios.get("supports/order_statistics/").then((response) =>{
        if(response.data.success){
          this.seriesob=response.data;
          console.log("this is array", this.seriesob)
          this.completed=response.data.completed
          this.processing=response.data.processing
          this.cancelled=response.data.cancelled
          this.series[0] =  this.completed
          this.series[1] =  this.processing
          this.series[2] =  this.cancelled
        }
      });

   },
 },
  mounted() {
    this.getorder();
  },
};
</script>

<style>
</style>