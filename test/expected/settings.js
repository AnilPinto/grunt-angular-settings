angular.module('moduleName1').constant('moduleName1Settings', {
    "sessionTtl": 500,
    "productDataAuthStateRequired": "AuthenticatedVerified",
    "stateLevels": {
        "Unauthenticated": 0,
        "Identified": 1,
        "IdentifiedVerified": 2,
        "Authenticated": 3,
        "AuthenticatedVerified": 4
    },
    "productizataionSessionEvents": {
        "end": {
            "authState": "Unauthenticated",
            "uiState": "login"
        },
        "timeout": {
            "authState": "Identified",
            "uiState": "main"
        }
    }
});
angular.module('moduleName2').constant('moduleName2Settings', {
    "sessionTtl": 1000,
    "productDataAuthStateRequired": "AuthenticatedPending",
    "stateLevels": {
        "Unauthenticated": 0,
        "Identified": 1,
        "IdentifiedVerified": 2,
        "Authenticated": 3,
        "AuthenticatedVerified": 4
    },
    "authSessionEvents": {
        "end": {
            "authState": "Unauthenticated",
            "uiState": "login"
        },
        "timeout": {
            "authState": "Identified",
            "uiState": "main"
        }
    }
});
