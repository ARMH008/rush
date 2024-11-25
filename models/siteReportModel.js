const mongoose = require("mongoose");

const siteInspectionSchema = new mongoose.Schema(
  {
    jmStaffEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    architectName: {
      type: String,
      required: true,
    },
    siteVisitCheckingDetails: {
      type: String,
      required: true,
    },
    sitePhotos: [
      {
        type: String,
      },
    ],
    checklist: {
      propsTightAndStraight: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      defectiveMaterialsReplaced: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      formworkCleaned: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      formworkWatertight: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      formworkslabchhajja: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      columnBeamSecured: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      coverProvided: {
        columnReinforcement: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        beamBottoms: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        beamSlides: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        slabBottom: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        chajjaSlabSlides: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        isComplete: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
      },
      chairsProvided: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      spacerBarsProvided: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      columnRingsProvided: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      dowelBarsProvided: {
        elevationPurdies: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        hangerColumn: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        futureBeamSlabStaircaseFlights: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
        isComplete: {
          value: { type: Boolean, default: false },
          description: { type: String },
        },
      },
      cubeSamplesTaken: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      noChamberInBeamSlab: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      shoringShuttingDone: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      basementHolesPermission: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      reinforcementTested: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      formworkStriking: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      slabUnderPropped: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      ptBeamsFormwork: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      ptBeamsDimensions: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
      slabThicknessUnderpropped: {
        value: { type: Boolean, default: false },
        description: { type: String },
      },
    },
    additionalRemarks: {
      type: String,
    },
    specificNonCompliances: {
      type: String,
      required: true,
    },
    modificationPhoto: [
      {
        type: String,
      },
    ],
    clientRepresentativeName: {
      type: String,
    },
    contractorRepresentativeName: {
      type: String,
    },
    clientsign: {
      type: String,
    },
    employeesign: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save middleware to set parent properties based on sub-properties
siteInspectionSchema.pre("save", function (next) {
  const checklist = this.checklist;

  checklist.coverProvided.isComplete =
    checklist.coverProvided.columnReinforcement.value &&
    checklist.coverProvided.beamBottoms.value &&
    checklist.coverProvided.beamSlides.value &&
    checklist.coverProvided.slabBottom.value &&
    checklist.coverProvided.chajjaSlabSlides.value;

  checklist.dowelBarsProvided.isComplete =
    checklist.dowelBarsProvided.elevationPurdies.value &&
    checklist.dowelBarsProvided.hangerColumn.value &&
    checklist.dowelBarsProvided.futureBeamSlabStaircaseFlights.value;

  next();
});

siteInspectionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "jmStaffEngineer",
    select: "name email",
  });
  next();
});

module.exports = mongoose.model("SiteInspection", siteInspectionSchema);
