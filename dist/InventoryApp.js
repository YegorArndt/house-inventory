"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const CheckCircleOutline_1 = __importDefault(require("@mui/icons-material/CheckCircleOutline"));
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const styles_1 = require("@mui/material/styles");
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const lodash_es_1 = require("lodash-es");
const api_ts_1 = require("./api.ts");
const HouseAreaHeader = ({ name }) => {
    const [isInEditState, setIsInEditState] = (0, react_1.useState)(false);
    const [houseAreaName, setHouseAreaName] = (0, react_1.useState)(name);
    const [isUpdating, setIsUpdating] = (0, react_1.useState)(false);
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const handleEdit = ({ houseAreaName: newName, }) => __awaiter(void 0, void 0, void 0, function* () {
        setIsUpdating(true);
        setHouseAreaName(newName); // Optimistic update
        try {
            yield (0, api_ts_1.updateHouseArea)(name, newName);
            // console.log(updateHouseArea)
            // console.log(newName)
        }
        catch (error) {
            console.error(error);
            setHouseAreaName(name); // Revert to the previous value
        }
        setIsUpdating(false);
        setIsInEditState(false);
    });
    return (<material_1.Box display='flex' alignItems='center' width='100%' mb='1rem'>
      <material_1.Typography fontSize='2rem' mr='2rem'>
        {(0, lodash_es_1.capitalize)(houseAreaName)}
      </material_1.Typography>
      {isInEditState && (<material_1.TextField {...register('houseAreaName', { required: true })} label='New name' size='small' variant='outlined' error={Boolean(errors['houseAreaName'])} autoFocus/>)}
      {isInEditState ? (<material_1.Box display='flex'>
          <material_1.IconButton onClick={handleSubmit(handleEdit)} disabled={isUpdating}>
            <CheckCircleOutline_1.default />
          </material_1.IconButton>
          <material_1.IconButton onClick={() => setIsInEditState(false)} disabled={isUpdating}>
            <Logout_1.default />
          </material_1.IconButton>
        </material_1.Box>) : (<material_1.Button startIcon={<Edit_1.default />} onClick={() => setIsInEditState(true)} disabled={isUpdating} sx={{ fontSize: '.8rem' }}>
          Edit the house area name
        </material_1.Button>)}
    </material_1.Box>);
};
const TableRow = ({ itemName, quantity, daysToUseUp = 0, price = 0, onSave }) => {
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            itemName,
            quantity,
            daysToUseUp,
            price,
        },
    });
    const [isInEditState, setIsInEditState] = (0, react_1.useState)(false);
    const handleEdit = (data) => {
        if (isInEditState) {
            onSave((prev) => {
                const index = prev.findIndex((item) => item.itemName === itemName);
                const newItems = [...prev];
                newItems[index] = data;
                return newItems;
            });
            setIsInEditState(false);
        }
        else {
            setIsInEditState(true);
        }
    };
    const renderCells = () => {
        const fieldNameValueMap = new Map([
            ['itemName', itemName],
            ['quantity', `${quantity}`],
            ['daysToUseUp', `${daysToUseUp}`],
            ['price', `${price}`],
        ]);
        return Array.from(fieldNameValueMap.entries()).map((entry, index) => (<material_1.TableCell key={(0, lodash_es_1.uniqueId)()} height={isInEditState ? '100px' : 'auto'}>
        {isInEditState ? (<material_1.Box position='relative'>
            <material_1.TextField fullWidth size='small' {...register(entry[0], {
                required: true,
                pattern: index === 0 ? /\w/ : /^[0-9]+$/,
            })}/>
            {errors[entry[0]] && (<material_1.Box position='absolute' color='red' whiteSpace='nowrap'>
                Check out this field
              </material_1.Box>)}
          </material_1.Box>) : (<material_1.Typography>{entry[1] || '😸'}</material_1.Typography>)}
      </material_1.TableCell>));
    };
    return (<material_1.Tooltip title={<material_1.Box component='form' onSubmit={handleSubmit(handleEdit)} px='1rem' py='0.5rem'>
          <material_1.IconButton type='submit'>
            {isInEditState ? <CheckCircleOutline_1.default /> : <Edit_1.default />}
          </material_1.IconButton>
          <material_1.IconButton>
            <Delete_1.default />
          </material_1.IconButton>
          {isInEditState && (<material_1.IconButton onClick={() => setIsInEditState(false)}>
              <Logout_1.default />
            </material_1.IconButton>)}
        </material_1.Box>} enterDelay={500} leaveDelay={200}>
      <material_1.TableRow>{renderCells()}</material_1.TableRow>
    </material_1.Tooltip>);
};
const InventoryTable = (_a) => {
    var { tableName, items: initialItems } = _a, props = __rest(_a, ["tableName", "items"]);
    const [items, setItems] = (0, react_1.useState)(initialItems);
    return (<material_1.Table {...props}>
      <material_1.TableHead sx={{ backgroundColor: 'grey.700' }}>
        <material_1.TableRow>
          <material_1.TableCell>{(0, lodash_es_1.capitalize)(tableName)}</material_1.TableCell>
          <material_1.TableCell>Quantity</material_1.TableCell>
          <material_1.TableCell>Days to use up</material_1.TableCell>
          <material_1.TableCell>Price</material_1.TableCell>
        </material_1.TableRow>
      </material_1.TableHead>
      <material_1.TableBody>
        {items.map((item) => (<TableRow key={item.itemName} onSave={setItems} {...item}/>))}
      </material_1.TableBody>
    </material_1.Table>);
};
const darkTheme = (0, styles_1.createTheme)({
    palette: {
        mode: 'dark',
    },
});
const InventoryApp = () => {
    const [areasWithTables, setAreasWithTables] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        (0, api_ts_1.getAll)().then((data) => {
            setAreasWithTables(data);
        });
    }, []);
    return (<styles_1.ThemeProvider theme={darkTheme}>
      <CssBaseline_1.default />
      <material_1.Box p='2rem'>
        <material_1.TextField label='Search' variant='outlined' 
    // onChange={handleSearch}
    fullWidth/>
        <material_1.Box width='100%'>
          {areasWithTables ? (Object.entries(areasWithTables).map(([houseArea, tables]) => (<material_1.Box key={houseArea} my='4rem'>
                <HouseAreaHeader name={houseArea}/>
                <material_1.Box display='flex' alignItems='baseline' gap='5rem' sx={{
                '& > *': {
                    maxWidth: '600px',
                },
            }}>
                  {tables.map(({ tableName, items }) => (<InventoryTable key={tableName} tableName={tableName} items={items}/>))}
                </material_1.Box>
              </material_1.Box>))) : (<material_1.Box py='2rem'>Loading...</material_1.Box>)}
        </material_1.Box>
      </material_1.Box>
    </styles_1.ThemeProvider>);
};
exports.default = InventoryApp;
//# sourceMappingURL=InventoryApp.js.map