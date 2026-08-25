import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportLaunchReport() {

  // --------------------------------
  // LOAD DATA
  // --------------------------------

  const simulationData =
    JSON.parse(
      localStorage.getItem(
        'simulationData'
      ) || '{}'
    )

  const simulationResult =
    JSON.parse(
      localStorage.getItem(
        'simulationResult'
      ) || '{}'
    )

  const pdf =
    new jsPDF(
      'p',
      'mm',
      'a4'
    )

  const pageWidth = 210
  const margin = 15

  let y = 20

  // --------------------------------
  // HEADER
  // --------------------------------

  pdf.setFillColor(
    91,
    33,
    182
  )

  pdf.rect(
    0,
    0,
    210,
    35,
    'F'
  )

  pdf.setTextColor(
    255,
    255,
    255
  )

  pdf.setFontSize(24)

  pdf.text(
    'LaunchIQ.ai',
    15,
    18
  )

  pdf.setFontSize(12)

  pdf.text(
    'AI Product Launch Intelligence Report',
    15,
    28
  )

  y = 48

  // --------------------------------
  // EXECUTIVE SUMMARY
  // --------------------------------

  pdf.setTextColor(
    20,
    20,
    20
  )

  pdf.setFontSize(18)

  pdf.text(
    'Executive Summary',
    margin,
    y
  )

  y += 10

  pdf.setFontSize(12)

  pdf.text(
    `Product Name: ${
      simulationData.productName ||
      'N/A'
    }`,
    margin,
    y
  )

  y += 8

  pdf.text(
    `Category: ${
      simulationData.category ||
      'N/A'
    }`,
    margin,
    y
  )

  y += 8

  pdf.text(
    `Industry: ${
      simulationData.industry ||
      'N/A'
    }`,
    margin,
    y
  )

  y += 8

  pdf.text(
    `Audience: ${
      simulationData.targetAudience ||
      simulationData.audience ||
      'N/A'
    }`,
    margin,
    y
  )

  y += 18

  // --------------------------------
  // KPI CARDS
  // --------------------------------

  const metrics = [
    {
      label:
        'Purchase',
      value:
        `${simulationResult.purchaseLikelihood}%`,
    },

    {
      label:
        'Risk',
      value:
        `${simulationResult.riskScore}%`,
    },

    {
      label:
        'Sentiment',
      value:
        simulationResult.sentiment,
    },

    {
      label:
        'Confidence',
      value:
        simulationResult.confidence,
    },
  ]

  metrics.forEach(
    (
      metric,
      index
    ) => {

      const x =
        margin +
        index * 45

      pdf.setFillColor(
        6,
        182,
        212
      )

      pdf.roundedRect(
        x,
        y,
        38,
        24,
        4,
        4,
        'F'
      )

      pdf.setTextColor(
        255,
        255,
        255
      )

      pdf.setFontSize(9)

      pdf.text(
        metric.label,
        x + 3,
        y + 7
      )

      pdf.setFontSize(14)

      pdf.text(
        metric.value,
        x + 3,
        y + 16
      )
    }
  )

  y += 40

  // --------------------------------
  // CHART CAPTURE FUNCTION
  // --------------------------------

  async function addChart(
    chartId: string,
    title: string
  ) {

    const chart =
      document.getElementById(
        chartId
      )

    if (!chart)
      return

    const canvas =
      await html2canvas(
        chart,
        {
          scale: 2,
          backgroundColor:
            '#111827',
        }
      )

    const image =
      canvas.toDataURL(
        'image/png'
      )

    pdf.addPage()

    pdf.setFontSize(18)

    pdf.setTextColor(
      20,
      20,
      20
    )

    pdf.text(
      title,
      margin,
      20
    )

    pdf.addImage(
      image,
      'PNG',
      15,
      30,
      180,
      110
    )
  }

  // --------------------------------
  // ADD CHARTS
  // --------------------------------

  await addChart(
    'demand-chart',
    'Demand Forecast'
  )

  await addChart(
    'consumer-chart',
    'Consumer Segments'
  )

  await addChart(
    'competitor-chart',
    'Competitor Benchmark'
  )

  await addChart(
    'radar-chart',
    'Product Strength Radar'
  )

  await addChart(
    'revenue-chart',
    'Revenue Projection'
  )

  await addChart(
    'price-chart',
    'Price Sensitivity'
  )

  // --------------------------------
  // AI RECOMMENDATIONS PAGE
  // --------------------------------

  pdf.addPage()

  pdf.setFontSize(18)

  pdf.text(
    'AI Recommendations',
    margin,
    20
  )

  let recommendationY =
    35

  const recommendations =
    simulationResult.recommendations ||
    []

  recommendations.forEach(
    (
      item: string
    ) => {

      const split =
        pdf.splitTextToSize(
          `• ${item}`,
          170
        )

      pdf.text(
        split,
        margin,
        recommendationY
      )

      recommendationY +=
        split.length * 8
    }
  )

  // --------------------------------
  // FOOTER
  // --------------------------------

  const pages =
    pdf.getNumberOfPages()

  for (
    let i = 1;
    i <= pages;
    i++
  ) {

    pdf.setPage(i)

    pdf.setFontSize(10)

    pdf.setTextColor(
      120
    )

    pdf.text(
      `Generated by LaunchIQ.ai • Page ${i}/${pages}`,
      15,
      290
    )
  }

  // --------------------------------
  // SAVE
  // --------------------------------

  pdf.save(
    `LaunchIQ_Report_${
      simulationData.productName ||
      'Product'
    }.pdf`
  )
}
